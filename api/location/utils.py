from rest_framework.exceptions import ValidationError
from geopy import Nominatim
from redis import StrictRedis
import redis_lock
from geopy.extra.rate_limiter import RateLimiter
import logging
import time

logger = logging.getLogger('watchadoing')

geolocator = Nominatim(user_agent="watchadoing")
redis_connection = StrictRedis(host="localhost", port=6655)

class LocationWrapper:
    def __init__(self, obj):
        self.obj = obj
        
    def __getattribute__(self, name: str):
        obj = object.__getattribute__(self, 'obj')
        if name == 'obj':
            return obj
        
        value = getattr(obj, name)
        if name in ['latitude', 'longitude']:
            return round(value, 6)

        return value
    
    def empty(self):
        return object.__getattribute__(self, 'obj') is None

def geocode(*args, **kwargs):
    with redis_lock.Lock(redis_connection, name='geocode'):
        stamp = time.perf_counter()
        try:
            if kwargs.pop('reverse', False):
                result = geolocator.reverse(*args, **kwargs)
            else:
                result = geolocator.geocode(*args, **kwargs)
        except:
            raise ValidationError('Could not geocode this location. Please type in another address manually.')
        remaining_time = 1 - (time.perf_counter() - stamp)
        if remaining_time > 0:
            time.sleep(remaining_time)
        return LocationWrapper(result)
    
def try_keys(obj, *keys):
    for key in keys:
        if obj.get(key):
            return obj.get(key)
    return None
            