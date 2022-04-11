from geopy import Nominatim
from redis import StrictRedis
import redis_lock
from geopy.extra.rate_limiter import RateLimiter

geolocator = Nominatim(user_agent="watchadoing")
redis_connection = StrictRedis(host="localhost", port=6655)
_geocode = RateLimiter(geolocator.geocode, min_delay_seconds=1)
_reverse = RateLimiter(geolocator.reverse, min_delay_seconds=1)

def geocode(*args, **kwargs):
  with redis_lock.Lock(redis_connection, 'geocode'):
    if kwargs.pop('reverse', False):
      return _reverse(*args, **kwargs)
    return _geocode(*args, **kwargs)