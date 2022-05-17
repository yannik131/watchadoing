from rest_framework import serializers
from location.serializers import LocationSerializer
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'title', 'longitude', 'latitude', 'likeCount', 'location']
        extra_kwargs = {
            'id': {
                'read_only': True
            }
        }