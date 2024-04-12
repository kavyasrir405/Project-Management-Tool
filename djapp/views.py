
from django.shortcuts import render
from rest_framework import generics,status
from .serializers import roomSerializer,CreateRoomSerializer,EmailSerializer
from .models import room,Email
from rest_framework.views import APIView
from rest_framework.response import Response

from django.core.mail import send_mail
from django.core.mail import EmailMessage

from djangoproj.settings import EMAIL_HOST_USER

# Create your views here.
class room_view(generics.ListAPIView):
    queryset= room.objects.all()
    serializer_class= roomSerializer

class CreateRoomView(generics.ListAPIView):
   
    
    queryset= room.objects.all()
    serializer_class= CreateRoomSerializer

    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serial= self.serializer_class(data= request.data)

        if serial.is_valid():
            guest_Can_pause =serial.data.get('guest_Can_pause')

            votes_to_skip= serial.data.get('votes_to_skip')

            host= self.request.session.session_key

            qset= room.objects.filter(host=host)

            if qset.exists():
                roomie=qset[0]
                roomie.guest_Can_pause=guest_Can_pause
                roomie.votes_to_skip=votes_to_skip
                roomie.save(update_fields=["guest_Can_pause","votes_to_skip"])
            else:
                roomie= room(host=host,guest_Can_pause=guest_Can_pause,votes_to_skip=votes_to_skip)
                roomie.save()
            return Response(roomSerializer(roomie).data)
        
class SendEmailView(APIView):
    serializer_class = EmailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
           
            subject = serializer.validated_data.get('subject')
            message = serializer.validated_data.get('message')
            recipient = serializer.validated_data.get('recipient')

          
            send_mail(subject, message, EMAIL_HOST_USER, [recipient], fail_silently=True)

            # Save email details to the database
            serializer.save()

            return Response({'message': 'Email sent and details saved successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        


