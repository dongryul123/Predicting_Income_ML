from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import LoginSerializer, exceptions
from rest_framework.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'nickname']
        # fields = ['username', 'email', 'nickname', 'age', 'workclass', 'education', 'marital_status',
        #             'occupation', 'relationship', 'sex', 'capital_gain', 'capital_loss', 'hours_per_week']

class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    # age = serializers.IntegerField(required=True)
    # workclass = serializers.CharField(required=True)
    # education = serializers.CharField(required=True)
    # marital_status = serializers.CharField(required=True)
    # occupation = serializers.CharField(required=True)
    # relationship = serializers.CharField(required=True)
    # sex = serializers.CharField(required=True)
    # capital_gain = serializers.IntegerField(required=False)
    # capital_loss = serializers.IntegerField(required=False)
    # hours_per_week = serializers.IntegerField(required=False)

class CustomLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, style={'input_type': 'password'})

    def authenticate(self, **kwargs):
        return authenticate(self.context['request'], **kwargs)

    def _validate_username(self, username, password):
        user = None

        if username and password:
            user = self.authenticate(username=username, password=password)
        else:
            msg = _('Must include "username" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = None

        if 'allauth' in settings.INSTALLED_APPS:
            from allauth.account import app_settings
            # Authentication through username
            # if app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.USERNAME:
            user = self._validate_username(username, password)

        else:
            # Authentication without using allauth
            if username:
                user = self._validate_username(username, password)

        # Did we get back an active user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        attrs['user'] = user
        return attrs


