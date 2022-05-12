from django.db import models
import uuid
import random
from location.models import Location
import logging

logger = logging.getLogger('watchadoing')

class Activity(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title       = models.CharField(max_length=30)
    longitude   = models.DecimalField(max_digits=9, decimal_places=6)
    latitude    = models.DecimalField(max_digits=9, decimal_places=6)
    location    = models.ForeignKey(Location, null=True, on_delete=models.SET_NULL, related_name='activities')
    likeCount   = models.IntegerField(default=0)
    
    @staticmethod
    def create_test_data():
        activities = ['Paintball', 'Coeliac disease', 'Blues', 'Boxing', 'Rock', 'Rap', 'Funk Rock', 'Jazz', 'Caregiving', 'Teaching', 'Meteorology', 'Electrical engineering', 'Architecture', 'Fire service', 'Police', 'Social work', 'Psychology', 'Journalism', 'Law', 'Acting', 'Computer Science', 'Physical therapy', 'Veterinary medicine', 'Pharmacy', 'Nursing', 'Dental medicine', 'Medicine', 'Advertising', 'Accounting', 'Business administration', 'Mechanical engineering', 'Chemistry', 'Mathematics', 'Biology', 'Physics', 'Extreme sports', 'Massage', 'Sauna', 'Astrology', 'Religion', 'Fast food', 'DIY', 'Zoo', 'Tattooing', 'Tea time', 'Diving', 'Traveling', 'Yoga', 'Shopping', 'Beauty', 'Picnicking', 'Pottery', 'Gardening', 'Painting', 'Handicraft', 'Bar touring', 'Partying', 'Politics', 'Hiking', 'Climbing', 'Bouldering', 'Dancing', 'Cat owning', 'Dog owning', 'Donating blood', 'Knitting', 'Sewing', 'Baking', 'Photography', 'Cooking', 'Merels', 'Reading', 'Risk', 'Catan', 'Carcassonne', 'Flute', 'Violin', 'Cycling', 'Table tennis', 'Badminton', 'Sailing', 'Canoeing', 'Volleyball', 'Poker', 'Concerts', 'Piano', 'Ice hockey', 'Golf', 'Kegeln', 'Snooker', 'Pool', 'Basketball', 'Soccer', 'Tennis', 'Skat', 'Durak', 'Swimming', 'Running', 'Netflix', 'Strolling', 'Bass', 'Singing', 'Drums', 'Guitar', 'Doppelkopf', 'Chess', 'Azul']
        random.shuffle(activities)
        for i, activity in enumerate(activities):
            lat = round(52.267207 + random.randint(-1e6, 1e6) / 1e6, 6)
            lon = round(8.018399 + random.randint(-1e6, 1e6) / 1e6, 6)
            location = Location.determine_from_coordinates(lat, lon)
            Activity.objects.create(title=activity, 
                                    latitude=lat, 
                                    longitude=lon, 
                                    location=location,
                                    likeCount=random.randint(0, 20))
            print(f'{i+1}/{len(activities)}')
        
            