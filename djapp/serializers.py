from rest_framework import serializers
from .models import room,Email


class roomSerializer(serializers.ModelSerializer ):

    class Meta:
        model=room
        fields=('id','code','host','guest_Can_pause','votes_to_skip','created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model=room
        fields=('guest_Can_pause','votes_to_skip')

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'