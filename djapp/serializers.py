from rest_framework import serializers
from .models import *





class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    useremail = serializers.EmailField()

    class Meta:
        model = Project
        fields=('projectname','useremail','teamlead_mail')




class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        # model = CustomUser
        fields = ('username', 'password')

class EpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epic
        fields = ['name', 'start_date', 'end_date']
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'user_id', 'email']



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