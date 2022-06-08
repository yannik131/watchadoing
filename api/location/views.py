from rest_framework import views, response, exceptions
from rest_framework.request import Request
from .models import Location
from .serializers import LocationSerializer
import logging
import traceback

logger = logging.getLogger('watchadoing')

class LocationCreateView(views.APIView):
    def post(self, request: Request):
        try:
            if request.data.get('address'):
                location = Location.determine_from_address(request.data.get('address'))
            elif request.data.get('coordinates'):
                location = Location.determine_from_coordinates(**request.data['coordinates'])
            else:
                raise exceptions.ValidationError({'error': 'Bad request'})
        except Exception as e:
            if request.data.get('address'):
                logger.warn(f'Address {request.data.get("address")} led to exception: {e}')
            elif request.data.get('coordinates'):
                logger.warn(f'Coordinates {request.data.get("coordinates")} led to error: {e}')
            else:
                logger.warn('Bad request!')
            raise e
            
        return response.Response({'location': LocationSerializer(location).data})
    
class LocationGetView(views.APIView):
    def get(self, request: Request):
        return response.Response({
            'locations': LocationSerializer(Location.objects.all(), many=True).data
        })