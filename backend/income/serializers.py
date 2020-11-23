from rest_framework import serializers
from .models import incomedata

class PredictSerializer(serializers.Serializer):
    age = serializers.IntegerField(required=True)
    workclass = serializers.CharField(required=True)
    education = serializers.CharField(required=True)
    marital_status = serializers.CharField(required=True)
    occupation = serializers.CharField(required=True)
    relationship = serializers.CharField(required=True)
    sex = serializers.CharField(required=True)
    hours_per_week = serializers.IntegerField(required=True)
    
class IncomeSerializer(serializers.Serializer):
    age = serializers.IntegerField(required=True)
    workclass = serializers.CharField(required=True)
    education = serializers.CharField(required=True)
    marital_status = serializers.CharField(required=True)
    occupation = serializers.CharField(required=True)
    relationship = serializers.CharField(required=True)
    sex = serializers.CharField(required=True)
    capital_gain = serializers.IntegerField(required=False)
    capital_loss = serializers.IntegerField(required=False)
    hours_per_week = serializers.IntegerField(required=True)
    income = serializers.IntegerField(required=True)

class IncomeRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = incomedata
        fields = '__all__'