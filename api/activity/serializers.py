from rest_framework import serializers
from location.serializers import UuidField, IdUuidField
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'title', 'likeCount', 'location']
        extra_kwargs = {
            'id': {
                'read_only': True
            }
        }
        
class ActivityWebsocketSerializer(ActivitySerializer):
    id = UuidField()
    location = IdUuidField()