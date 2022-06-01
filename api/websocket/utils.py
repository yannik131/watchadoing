from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

channel_layer = get_channel_layer()

def ws_send(data: dict) -> None:
    async_to_sync(channel_layer.group_send)(
        'default',
        data
    )