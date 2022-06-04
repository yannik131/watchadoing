from rest_framework import views, response, status
from rest_framework.request import Request
from .models import Activity
from location.models import Location
from django.db.models import F
from .serializers import ActivitySerializer

class ActivityCreateView(views.APIView):
    def post(self, request: Request):
        request.data['location'] = Location.objects.get(pk=request.data['location'])
        Activity.objects.create(**request.data)
        return response.Response(status=status.HTTP_201_CREATED)
        
class ActivityGetView(views.APIView):
    def get(self, request: Request):
        return response.Response({
            'activities': ActivitySerializer(Activity.objects.all(), many=True).data
        })
    
class ActivityLikeView(views.APIView):
    def post(self, request: Request):
        activity = Activity.objects.get(pk=request.data['id'])
        activity.likeCount += 1
        activity.save(update_fields=['likeCount'])
        return response.Response(status=status.HTTP_200_OK)
        
class ActivityDislikeView(views.APIView):
    def post(self, request: Request):
        activity = Activity.objects.get(pk=request.data['id'])
        activity.likeCount -= 1
        activity.save(update_fields=['likeCount'])
        return response.Response(status=status.HTTP_200_OK)