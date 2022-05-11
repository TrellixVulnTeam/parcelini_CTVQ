from django.db import models


class Links(models.Model):
    state = models.CharField(max_length=10)
    arcgis_link = models.TextField()
    jurisdiction_type = models.CharField(max_length=10)
    jurisdiction_name = models.TextField()
    data_type = models.CharField(max_length=20)
    data_details = models.CharField(max_length=100)
