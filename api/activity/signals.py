from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Activity
from websocket.utils import ws_send
from .serializers import ActivitySerializer
import logging
import json
from .utils import UUIDEncoder

logger = logging.getLogger('watchadoing')

@receiver(post_save, sender=Activity)
def activity_saved(instance: Activity, created, **kwargs):
    data = ActivitySerializer(instance).data
    ws_send({
        'category': 'activity',
        'action': 'created' if created else 'updated',
        'type': 'data_message',
        'data': json.dumps(data, cls=UUIDEncoder)
    })
