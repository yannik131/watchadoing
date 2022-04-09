from django.db import models
import uuid

class Activity(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title       = models.CharField(max_length=30)
    longitude   = models.DecimalField(max_digits=9, decimal_places=6)
    latitude    = models.DecimalField(max_digits=9, decimal_places=6)
    likeCount   = models.PositiveIntegerField(default=0)