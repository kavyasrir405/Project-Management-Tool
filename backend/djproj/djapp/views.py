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
        print(project_name)
        teamlead=data.get('teamlead')
        print(teamlead)
        

        print(project_name)
        if project_name:
            project = Project(projectname=project_name,teamlead_email=teamlead)
            project.save()
            return JsonResponse({'message': 'Project created successfully', 'projectid': project.projectid}, status=201)
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

        if Project_TeamMember.objects.filter(team_member_email=email).exists():
            return JsonResponse({'error': 'Email is already associated with this project'}, status=400)
        if project_ins.teamlead_email == email:
            return JsonResponse({'error': 'Email is the team lead of this project'}, status=400)

    
        team_member = Project_TeamMember.objects.create(team_member_email=email,project=project_ins)
        
        team_member.save()

        return JsonResponse({'message': 'Invitation processed successfully'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)