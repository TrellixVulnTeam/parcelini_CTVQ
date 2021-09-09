from django.db import models
from django.utils.timezone import now
class Contact(models.Model):
    message = models.CharField(max_length=1000, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(default=now, blank=True)