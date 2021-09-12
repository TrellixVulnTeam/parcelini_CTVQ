from django.db import models

class Unique(models.Model):
    ip = models.CharField(max_length=20, blank=False, null=False)
    hostname = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=200, blank=True, null=True)
    region = models.CharField(max_length=200, blank=True, null=True)
    country = models.CharField(max_length=200, blank=True, null=True)
    loc = models.CharField(max_length=200, blank=True, null=True)
    org = models.CharField(max_length=200, blank=True, null=True)
    postal = models.CharField(max_length=200, blank=True, null=True)
    timezone = models.CharField(max_length=200, blank=True, null=True)
    country_name = models.CharField(max_length=200, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    class Meta:
        indexes = [
            models.Index(fields=['ip']),
        ]