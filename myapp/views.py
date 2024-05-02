from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *

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