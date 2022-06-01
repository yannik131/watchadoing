from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json
import logging

logger = logging.getLogger('watchadoing')

class Consumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            'default',
            self.channel_name
        )
        self.accept()
        
    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            'default',
            self.channel_name
        )
        return super().disconnect(code)
        
    def data_message(self, text_data):
        text_data.pop('type')
        self.send(text_data=json.dumps(text_data))