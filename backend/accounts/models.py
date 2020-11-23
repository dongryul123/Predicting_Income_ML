from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    nickname = models.CharField(max_length=10, blank=False, null=False)
    # age = models.IntegerField(blank=False, null=False)
    # workclass = models.CharField(max_length=100, null=False)
    # education = models.CharField(max_length=100, null=False, blank=False)
    # marital_status = models.CharField(max_length=100, null=False, blank=False)
    # occupation = models.CharField(max_length=100, null=False, blank=False)
    # relationship = models.CharField(max_length=100, null=False, blank=False)
    # sex = models.CharField(max_length=100, null=False, blank=False)
    # capital_gain = models.IntegerField(default=0, null=False, blank=False)
    # capital_loss = models.IntegerField(default=0, null=False, blank=False)
    # hours_per_week = models.IntegerField(default=40, null=False, blank=False)

    REQUIRED_FIELDS = ['nickname', 'email']
