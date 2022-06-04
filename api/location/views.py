from rest_framework import views, response
from rest_framework.request import Request
from .models import Location
from .serializers import LocationSerializer


class LocationCreateView(views.APIView):
    def post(self, request: Request):
        if request.data.get('address'):
            location = Location.determine_from_address(request.data.get('address'))
        else:
            location = Location.determine_from_coordinates(**request.data['coordinates'])
            
        return response.Response({'location': LocationSerializer(location).data})
    
class LocationGetView(views.APIView):
    def get(self, request: Request):
        return response.Response({
            'locations': LocationSerializer(Location.objects.all(), many=True).data
        })