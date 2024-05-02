
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
from django.http import JsonResponse
from django.contrib.auth import authenticate
from djangoproj.settings import EMAIL_HOST_USER
from django.views import View

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

            project = Project.objects.create(projectname=projectname,teamid = team,teamlead_mail= useemail)

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
            serializer = CustomUserSerializer(user)
            return Response({'message': 'Login successful', 'user': serializer.data}, status=status.HTTP_200_OK)
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


class ProjectListView(View):
    def get(self, request):
        # Get the current user's email from the request
        user_email = request.GET.get('userEmail')  # Assuming you pass the user's email as a query parameter

        # Query the projects associated with the user's email
        projects = Project.objects.filter(teamlead_mail=user_email).values('projectid', 'projectname')

        # Convert the queryset to a list of dictionaries
        projects_list = list(projects)

        # Return the projects as JSON response
        return JsonResponse(projects_list, safe=False)
    





class ReactViews(APIView):
    def get(self, request):
        # Serialize queryset using serializer
        queryset = backlog.objects.all()
        serializer = BacklogSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BacklogSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
class updateBacklog(APIView):
    def get(self, request):
        # Serialize queryset of sprints using serializer
        queryset = Sprint.objects.all()
        serializer = SprintSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Deserialize sprint data
        sprint_data = {
            'sprint':request.data.get('sprint'),
            'start_date': request.data.get('start_date'),
            'end_date': request.data.get('end_date'),
            'sprint_goal': request.data.get('sprint_goals')
        }
        
        # Validate sprint data
        sprint_serializer = SprintSerializer(data=sprint_data)
        if sprint_serializer.is_valid():
            # Create sprint
            sprint_instance = sprint_serializer.save()
        else:
            return Response(sprint_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Get issues from request data
        issue_names = request.data.get('issues', [])

        # Update issues with sprint
        for issue_name in issue_names:
            try:
                # Get or create backlog item
                backlog_item, created = Backlog.objects.get_or_create(backlogName=issue_name)
                backlog_item.sprint = sprint_instance.sprint
                backlog_item.save()
            except Backlog.DoesNotExist:
                return Response({'error': f"Issue with name '{issue_name}' does not exist"}, status=status.HTTP_404_NOT_FOUND)

        return Response({'message': 'Sprint and Backlog updated successfully'}, status=status.HTTP_200_OK)