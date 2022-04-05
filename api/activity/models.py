from django.db import models

class Activity(models.Model):
    title       = models.CharField(max_length=30)
    longitude   = models.DecimalField(max_digits=9, decimal_places=6)
    latitude    = models.DecimalField(max_digits=9, decimal_places=6)
    likeCount   = models.PositiveIntegerField(default=0)