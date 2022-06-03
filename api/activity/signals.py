from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Activity
from websocket.utils import ws_send
from .serializers import ActivityWebsocketSerializer
import logging

logger = logging.getLogger('watchadoing')

@receiver(post_save, sender=Activity)
def activity_saved(instance: Activity, created, **kwargs):
    ws_send({
        'category': 'activity',
        'action': 'created' if created else 'updated',
        'type': 'data_message',
        'data': ActivityWebsocketSerializer(instance).data
    })
