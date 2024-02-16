from django.db import models
from django.contrib.auth.models import User

class Token(models.Model):
    refresh_token = models.CharField(max_length = 200)
    user = models.OneToOneField(User, on_delete=models.CASCADE)