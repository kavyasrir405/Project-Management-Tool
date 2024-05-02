
from django.shortcuts import redirect, render
from rest_framework import generics,status
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import logout     
from django.contrib.auth import authenticate, login
from django.utils.safestring import mark_safe
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import authenticate
from djangoproj.settings import EMAIL_HOST_USER


# Create your views here.

  
        
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

class CreateProjectView(APIView):
    serializer_class = ProjectSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print(request.data)
            projectname= serializer.validated_data.get('projectname')
            uuseremail= serializer.validated_data.get('useremail')
            useemail= serializer.validated_data.get('teamlead_mail')
            print(useemail)
            team = Team.objects.create(useremail=useemail)

            project = Project.objects.create(projectname=projectname,teamid = team)

            project.save()

            subject = "Join Project"
            message = "welcome! Your invited to join the project - http://127.0.0.1:8000/"
            recipient = uuseremail
          
            send_mail(subject, message, EMAIL_HOST_USER, [recipient], fail_silently=True)

        
            team.save()



            return Response({'project_id': project.projectid}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            






        
        
from rest_framework.decorators import api_view




class LoginUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            # User authenticated successfully
            return Response({'message': 'Login successful', 'user_email': user.email}, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
class LogoutUserView(APIView):
    def post(self, request):
        # Perform logout action
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class EpicListCreateAPIView(generics.ListCreateAPIView):
    queryset = Epic.objects.all()
    serializer_class = EpicSerializer
from django.core.serializers import serialize
def timeline(request):
    epics = Epic.objects.all()
    # Serialize queryset to JSON format
    serialized_epics = serialize('json', epics)
    return render(request, 'time.html', {'epics': mark_safe(serialized_epics)})


