from django.dispatch import receiver
from django.db.models.signals import m2m_changed, post_save, pre_save, pre_delete
from .models import Location
from .utils import geocode, get_lock
from websocket.utils import ws_send
from .serializers import LocationSerializer
import logging

logger = logging.getLogger('watchadoing')

@receiver(post_save, sender=Location)
def location_created(instance: Location, created, **kwargs):
    parent_components = instance.parent_components()
    
    if (instance.parent or not parent_components) and instance.group:
        with get_lock('group'):
            instances = Location.objects.filter(group=instance.group)
            if instances.filter(parent__isnull=True).exists():
                return
            ws_send({
                'category': 'location',
                'action': 'created',
                'type': 'data_message',
                'data': LocationSerializer(instances, many=True).data
            })
            instances.update(group=None)
            return
    
    components = dict(
        country=parent_components.get('country'),
        state=parent_components.get('state'),
        county=parent_components.get('county'),
        city=parent_components.get('city')
    )
    try:
        parent = Location.objects.get(**components)
    except Location.DoesNotExist:
        query = Location.components_to_string(components)
        loc = geocode(query, addressdetails=True)
        try:
            parent = Location.objects.create(**components, longitude=loc.longitude, latitude=loc.latitude, group=instance.group)
        except AttributeError:
            logger.warn(f'Could not geocode parent of location {instance}: geocode("{query}") returned None')
            return
    instance.parent = parent
    instance.save()