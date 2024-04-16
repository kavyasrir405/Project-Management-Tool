
from django.shortcuts import render
from rest_framework import generics,status
from .serializers import roomSerializer,CreateRoomSerializer,EmailSerializer,ProjectSerializer,LoginUserSerializer
from .models import room,Email,Project,Team,CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
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

class CreateProjectView(APIView):
    serializer_class = ProjectSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
           
            projectname= serializer.validated_data.get('projectname')
            team = Team.objects.create()
            project = Project.objects.create(projectname=projectname,teamid = team)

            project.save()


            return Response({'project_id': project.projectid}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        
# class LoginUserView(generics.CreateAPIView):
#     serializer_class = LoginUserSerializer
#     queryset= CustomUser.objects.all()

class HomeView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

def AboutMeView(APIView):
    pass
