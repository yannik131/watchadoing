from rest_framework import views, response
from rest_framework.exceptions import ValidationError
from rest_framework.request import Request
from rest_framework.status import HTTP_200_OK
from .models import Location
from .serializers import LocationSerializer


class LocationView(views.APIView):
    def post(self, request: Request):
        location = Location.determine_from_address(request.data.get('address'))
            
        return response.Response({'location': LocationSerializer(location).data})