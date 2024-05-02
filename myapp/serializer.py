from rest_framework import serializers
from .models import *

class BacklogSerializer(serializers.ModelSerializer):
    class Meta:
        model= backlog
        fields=  ('backlogName',)  
class UpdateBacklogSerializer(serializers.ModelSerializer):
    class Meta:
        model= backlog
        fields=  ('sprint',)
class SprintSerializer(serializers.ModelSerializer):
    class Meta:
        model= Sprint
        fields=  '__all__'