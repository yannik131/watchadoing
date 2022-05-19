from logging import warn
from django.db import models
from .utils import geocode
from rest_framework.exceptions import ValidationError
import geopy
import uuid
import logging

logger = logging.getLogger('watchadoing')

class Location(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4)
    country     = models.CharField(max_length=40)
    state       = models.CharField(max_length=40, null=True, blank=True)
    county      = models.CharField(max_length=40, null=True, blank=True)
    city        = models.CharField(max_length=40, null=True, blank=True)
    longitude   = models.DecimalField(max_digits=9, decimal_places=6)
    latitude    = models.DecimalField(max_digits=9, decimal_places=6)
    parent      = models.ForeignKey('Location', null=True, on_delete=models.SET_NULL, related_name='children')
    
    COMPONENTS = ['country', 'state', 'county', 'city']
    
    class Meta:
        unique_together = ['country', 'state', 'county', 'city']
        indexes = [
            models.Index(fields=['country', 'state', 'county', 'city'])
        ]
        
    @staticmethod
    def determine_from_coordinates(latitude, longitude):
        location = geocode(f"{latitude}, {longitude}", reverse=True, addressdetails=True)
        if location is None:
            raise ValidationError(f"The coordinates seem to be ill-formatted: {latitude}, {longitude}")
        return Location.get_from_geopy_location(location)
    
    @staticmethod
    def determine_from_address(address):
        try:
            return Location.objects.get(city=address)
        except:
            location = geocode(address, addressdetails=True)
        if location is None:
            raise ValidationError({'error': "The address could not be found."})
        return Location.get_from_geopy_location(location)    
    
    @staticmethod
    def get_from_geopy_location(geopy_location: geopy.location.Location):
        address = geopy_location.raw['address']
        components = dict(
            country=address['country'],
            state=address.get('state', address.get('region', address.get('city', address.get('town')))),
            county=address.get('county'),
            city=address.get('city', address.get('town', address.get('village', address.get('county'))))
        )
        if components['county'] is None:
            components['county'] = components['city']
        try:
            location = Location.objects.get(**components)
        except:
            location = Location.objects.create(**components, latitude=geopy_location.latitude, longitude=geopy_location.longitude)
        return location
    
    def highest_component_index(self):
        for i, element in enumerate(reversed(Location.COMPONENTS)):
            if getattr(self, element):
                return 3-i
    
    def parent_components(self):
        return dict([(component, getattr(self, component)) for component in Location.COMPONENTS[:self.highest_component_index()] if getattr(self, component)])
    
    def __str__(self):
        if self.city:
            return self.city + ", " + self.state
        elif self.county:
            return self.county + ", " + self.state
        elif self.state:
            return self.state + ", " + self.country
        else:
            return self.country
