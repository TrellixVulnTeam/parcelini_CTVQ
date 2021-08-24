
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework_api_key.models import AbstractAPIKey

class UserAPIKey(AbstractAPIKey):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="api_keys",
    )


class UserSecretKey(models.Model):
    secret = models.CharField(max_length=100)
    key = models.ForeignKey(
        UserAPIKey,
        on_delete=models.CASCADE,
        related_name="api_keys",
    )
