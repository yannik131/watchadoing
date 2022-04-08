from rest_framework import viewsets
from .serializers import ActivitySerializer
from .models import Activity

class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()