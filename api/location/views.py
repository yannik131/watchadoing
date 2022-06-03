from rest_framework import views, response
from rest_framework.exceptions import ValidationError
from rest_framework.request import Request
from rest_framework.status import HTTP_200_OK
from .models import Location
from .serializers import LocationSerializer


class LocationView(views.APIView):
    def post(self, request: Request):
        if request.data.get('address'):
            location = Location.determine_from_address(request.data.get('address'))
        else:
            location = Location.determine_from_coordinates(**request.data['coordinates'])
            
        return response.Response({'location': LocationSerializer(location).data})
    
    def get(self, request: Request):
        raise Exception('Testing logging')
        return response.Response({
            'locations': LocationSerializer(Location.objects.all(), many=True).data
        })