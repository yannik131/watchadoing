from django.dispatch import receiver
from django.db.models.signals import m2m_changed, post_save, pre_save, pre_delete
from .models import Location
from .utils import geocode
import logging

logger = logging.getLogger('watchadoing')

@receiver(post_save, sender=Location)
def location_created(instance: Location, created, **kwargs):
    if instance.parent:
        return
    parent_components = instance.parent_components()
    if parent_components:
        components = dict(
            country=parent_components.get('country'),
            state=parent_components.get('state'),
            county=parent_components.get('county'),
            city=parent_components.get('city')
        )
        try:
            parent = Location.objects.get(**components)
        except Location.DoesNotExist:
            loc = geocode(parent_components)
            parent = Location.objects.create(**components, longitude=loc.longitude, latitude=loc.latitude)
        instance.parent = parent
        instance.save()