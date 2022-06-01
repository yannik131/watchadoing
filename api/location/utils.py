from rest_framework.exceptions import ValidationError
from geopy import Nominatim
from redis import StrictRedis
import redis_lock
import logging
import time
from django.apps import apps

logger = logging.getLogger('watchadoing')

geolocator = Nominatim(user_agent="watchadoing")
redis_connection = StrictRedis(host="localhost", port=6655)

def geocode(*args, **kwargs):
    with redis_lock.Lock(redis_connection, name='geocode'):
        stamp = time.perf_counter()
        try:
            if kwargs.pop('reverse', False):
                result = geolocator.reverse(*args, **kwargs)
            else:
                result = geolocator.geocode(*args, **kwargs)
        except:
            raise ValidationError({'error': 'Could not geocode this location. Please type in another address manually.'})
        remaining_time = 1 - (time.perf_counter() - stamp)
        if remaining_time > 0:
            time.sleep(remaining_time)
        return result
    
def try_keys(obj, *keys):
    for key in keys:
        if obj.get(key):
            return obj.get(key)
    return None

def delete_create():
    Location = apps.get_model('location.Location')
    try:
        Location.objects.get(city='Kühlungsborn').delete()
    except:
        pass
    Location.determine_from_address('Kühlungsborn')