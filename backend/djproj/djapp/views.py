from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.middleware.csrf import get_token
from djproj.settings import EMAIL_HOST_USER
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from django.core.mail import send_mail

import json

@csrf_exempt 
def create_project(request):
    print("before")
    if request.method == 'POST':
        # Parse request body as JSON
        data = json.loads(request.body)
        project_name = data.get('projectname')
        teamlead = data.get('teamlead')

        if project_name:
            project = Project(projectname=project_name, teamlead_email=teamlead)
            project.save()
            
            # Create a dictionary with all parameters
            response_data = {
                'message': 'Project created successfully',
                'projectid': project.projectid,
                'projectname': project.projectname,
                'teamlead_email': project.teamlead_email,
            }
            
            return JsonResponse(response_data, status=201)
        else:
            return JsonResponse({'error': 'Project name is required'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
@csrf_exempt
def csrf_token(request):
   
    csrf_token = get_token(request)
    print(csrf_token)
    
    return JsonResponse({'csrfToken': csrf_token})
@csrf_exempt
def generate_invitation_token(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        projectid = data.get('projectid')  # Get projectid from the request data
        serializer = URLSafeTimedSerializer('your-secret-key')
        token = serializer.dumps(email)

        # Include projectid in the invitation link
        invitation_link = f'http://localhost:3000/accept-invitation?projectid={projectid}&token={token}'

        subject = "Join Project"
        message = f"Welcome! You're invited to join the project with ID {projectid}. Click the link below to accept:\n{invitation_link}"
        
        send_mail(subject, message, EMAIL_HOST_USER, [email], fail_silently=True)
        print("sent")
        return JsonResponse({'token': token})
       
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    

@csrf_exempt
def verify_invitation_token(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')
        print(token,"verify")
        serializer = URLSafeTimedSerializer('your-secret-key')
        try:
            email = serializer.loads(token, max_age=18000)  # Token expires in 5 hour
            return JsonResponse({'email': email})
        except SignatureExpired:
            return JsonResponse({'error': 'Token has expired'}, status=400)
        except BadSignature:
            return JsonResponse({'error': 'Invalid token'}, status=400)

@csrf_exempt
def process_invitation_token(request):
    if request.method == 'POST':
        # Extract email, project ID, and invitation token from the request data
        data = json.loads(request.body)
        email = data.get('email')
        project_id = data.get('projectid')
        print(project_id)
        try:
            project_ins = Project.objects.get(projectid=project_id)
        except Project.DoesNotExist:
            return JsonResponse({'error': 'Project not found'}, status=404)
<<<<<<< HEAD

        if Project_TeamMember.objects.filter(team_member_email=email,project=project_ins).exists() or project_ins.teamlead_email == email :
            return JsonResponse({'error': 'Email is already associated with this project'}, status=400)
    
        team_member = Project_TeamMember.objects.create(team_member_email=email,project=project_ins)
        
=======
            
        if Project_TeamMember.objects.filter(team_member_email=email).exists():
            return JsonResponse({'error': 'Email is already associated with this project'}, status=400)
        if project_ins.teamlead_email == email:
            return JsonResponse({'error': 'Email is the team lead of this project'}, status=400)    
        team_member = Project_TeamMember.objects.create(team_member_email=email,project=project_ins) 
>>>>>>> 394d68972024b4944c6599535b13a502f7fdcb7a
        team_member.save()

        return JsonResponse({'message': 'Invitation processed successfully'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
<<<<<<< HEAD
    
from django.http import JsonResponse
from .models import Project, Project_TeamMember

def project_list(request):
    if request.method == 'GET':
        email = request.GET.get('email', None)
        if email:
            # Retrieve projects where the email matches the team lead
            projects_lead = Project.objects.filter(teamlead_email=email)

            # Retrieve projects where the email matches a team member
            projects_member = Project_TeamMember.objects.filter(team_member_email=email).values('project')  # Retrieve project IDs

            # Combine both lists of projects
            projects = list(projects_lead) + list(Project.objects.filter(pk__in=projects_member))

            # Create a list of project data including team lead information
            project_data = [
                {
                    'projectid': project.projectid,
                    'projectname': project.projectname,
                    'teamlead_email': project.teamlead_email
                } 
                for project in projects
            ]

            return JsonResponse(project_data, safe=False)
        else:
            return JsonResponse({'error': 'Email parameter is missing'}, status=400)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
=======

@csrf_exempt
def get_team_members(request):
    if request.method == 'GET':
        # Get projectId from query parameters
        project_id = request.GET.get('projectid')

        if project_id:
            # Fetch all team members for the specified project from the database
            team_members_emails = Project_TeamMember.objects.filter(project__projectid=project_id).values_list('team_member_email', flat=True)
            
            # Fetch user details for team members
            team_members = UserAccount.objects.filter(email__in=team_members_emails).values('email', 'first_name', 'last_name')

            # Convert queryset to list of dictionaries
            team_members_list = list(team_members)

            return JsonResponse({'team_members': team_members_list})
        else:
            return JsonResponse({'error': 'Project ID is required'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
>>>>>>> 394d68972024b4944c6599535b13a502f7fdcb7a
