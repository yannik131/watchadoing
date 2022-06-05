from django.db import models
from .utils import geocode, try_keys
from rest_framework.exceptions import ValidationError
import geopy
import uuid
import logging

logger = logging.getLogger('watchadoing')
COMPONENTS = ['country', 'state', 'county', 'city']

class Location(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4)
    country     = models.CharField(max_length=40)
    state       = models.CharField(max_length=40, null=True, blank=True)
    county      = models.CharField(max_length=40, null=True, blank=True)
    city        = models.CharField(max_length=40, null=True, blank=True)
    longitude   = models.DecimalField(max_digits=9, decimal_places=6)
    latitude    = models.DecimalField(max_digits=9, decimal_places=6)
    parent      = models.ForeignKey('Location', null=True, on_delete=models.SET_NULL, related_name='children')
    group       = models.UUIDField(default=uuid.uuid4, null=True)
    
    class Meta:
        unique_together = COMPONENTS
        indexes = [
            models.Index(fields=COMPONENTS)
        ]
        
    @staticmethod
    def determine_from_coordinates(latitude, longitude):
        #zoom 10 restricts result to city coordinates: https://nominatim.org/release-docs/develop/api/Reverse/#result-limitation
        location = geocode(f"{latitude}, {longitude}", reverse=True, addressdetails=True, zoom=10)
        if location is None:
            raise ValidationError({'error': "location.error.badCoordinates"})
        return Location.get_from_geopy_location(location)
    
    @staticmethod
    def determine_from_address(address):
        try:
            return Location.objects.get(city=address)
        except:
            #this location contains coordinates from the original address
            location = geocode(address, addressdetails=True)
            components = Location.get_components_from_geopy_location(location)
            address = Location.components_to_string(components)
            #this location, however, contains coordinates of the city
            location = geocode(address, addressdetails=True)
        if location is None:
            raise ValidationError({'error': "location.error.notFound"})
        return Location.get_from_geopy_location(location) 
    
    @staticmethod
    def get_components_from_geopy_location(geopy_location: geopy.location.Location):
        address = geopy_location.raw['address']
        components = dict(
            country=try_keys(address, 'country'),
            state=try_keys(address, 'state', 'province', 'region'),
            county=try_keys(address, 'county', 'district', 'municipality'),
            city=try_keys(address, 'city', 'town', 'village', 'hamlet')
        )
        
        return components
    
    @staticmethod
    def get_from_geopy_location(geopy_location: geopy.location.Location):
        components = Location.get_components_from_geopy_location(geopy_location)
        #Berlin..
        if components['city'] and not components['state']:
            components['state'] = components['city']
            
        for component in ['state', 'city']:
            if components.get(component) is None:
                raise ValidationError({'error': 'location.error.missingComponent'})
            
        if components['county'] is None:
            components['county'] = components['city']
        try:
            location = Location.objects.get(**components)
        except:
            location = Location.objects.create(**components, latitude=geopy_location.latitude, longitude=geopy_location.longitude)
        return location
    
    @staticmethod
    def components_to_string(components: dict):
        string = components['country']
        for component in ['state', 'county', 'city']:
            if components[component]:
                string = components[component] + ", " + string
        return string
    
    def highest_component_index(self):
        for i, element in enumerate(reversed(COMPONENTS)):
            if getattr(self, element):
                return 3-i
    
    def parent_components(self):
        return dict(
            [
                (component, getattr(self, component)) 
                for component in COMPONENTS[:self.highest_component_index()] 
                if getattr(self, component)
            ])
    
    def __str__(self):
        if self.city:
            return self.city + ", " + self.state
        elif self.county:
            return self.county + ", " + self.state
        elif self.state:
            return self.state + ", " + self.country
        else:
            return self.country
