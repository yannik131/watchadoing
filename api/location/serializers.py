from rest_framework import serializers
from .models import Location
import uuid

class UuidField(serializers.CharField):
    def to_representation(self, value):
        return str(value)
        
class IdUuidField(serializers.CharField):
    def to_representation(self, value):
        if value is None:
            return None
        return str(value.id)

class LocationSerializer(serializers.ModelSerializer):
    id = UuidField()
    #source='parent.id' fails if parent is None..
    parent = IdUuidField()
    
    class Meta:
        model = Location
        fields = ['id', 'latitude', 'longitude', 'city', 'county', 'state', 'country', 'parent']