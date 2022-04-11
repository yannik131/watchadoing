from logging import warn
from django.db import models
from .utils import geocode
from rest_framework.exceptions import ValidationError
import geopy
import uuid
import logging

logger = logging.getLogger('watcha')

class Location(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4)
    country     = models.CharField(max_length=40)
    state       = models.CharField(max_length=40, null=True, blank=True)
    county      = models.CharField(max_length=40, null=True, blank=True)
    city        = models.CharField(max_length=40, null=True, blank=True)
    longitude   = models.DecimalField(max_digits=9, decimal_places=6)
    latitude    = models.DecimalField(max_digits=9, decimal_places=6)
    parent      = models.ForeignKey('Location', null=True, on_delete=models.SET_NULL, related_name='children')
    
    class Meta:
        unique_together = ['country', 'state', 'county', 'city']
        indexes = [
            models.Index(fields=['country', 'state', 'county', 'city'])
        ]
    
    @staticmethod
    def determine_from_address(address):
        logger.debug(address)
        try:
            return Location.objects.get(city=address)
        except:
            location = geocode(address, addressdetails=True)
            logger.debug
        if location is None:
            raise ValidationError({'error': "The address could not be found."})
        return Location.get_from_geopy_location(location)    
    
    @staticmethod
    def get_from_geopy_location(geopy_location: geopy.location.Location):
        address = geopy_location.raw['address']
        components = dict(
            country=address['country'],
            state=address.get('state', address.get('city', address.get('town'))),
            county=address.get('county'),
            city=address.get('city', address.get('town', address.get('village', address.get('county'))))
        )
        for component in components:
            if component is None:
                raise ValidationError({'error': "Could not determine city from address. Please specify your city correctly."})
        try:
            location = Location.objects.get(**components)
        except:
            location = Location.objects.create(**components, latitude=round(geopy_location.latitude, 6), longitude=round(geopy_location.longitude, 6))
        return location
    
    def __str__(self):
        return f"{self.city}, {self.county}, {self.state}"