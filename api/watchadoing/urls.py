"""watchadoing URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from activity import views as activity_views
from location import views as location_views
from django.urls import path

urlpatterns = [
    path('api/locations/create/', location_views.LocationCreateView.as_view()),
    path('api/locations/', location_views.LocationGetView.as_view()),
    path('api/activities/', activity_views.ActivityGetView.as_view()),
    path('api/activities/like/', activity_views.ActivityLikeView.as_view()),
    path('api/activities/dislike/', activity_views.ActivityDislikeView.as_view()),
    path('api/activities/create/', activity_views.ActivityCreateView.as_view())
]
