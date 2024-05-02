
from django.urls import include, path
from .views import *

from rest_framework_simplejwt import views as jwt_views
urlpatterns = [
    
    
    path('create', SendEmailView.as_view()),
    path('email', SendEmailView.as_view()),
    path('proj',  CreateProjectView.as_view()),
   
  
    path('login', LoginUserView.as_view()),
    path('logout', LogoutUserView.as_view()),
    path('epics', EpicListCreateAPIView.as_view()),
     path('timeline', timeline, name='timeline'),
     path('project_list', ProjectListView.as_view()),
     path('create_issue', ReactViews.as_view()),
     
    path('update_backlog',updateBacklog.as_view()),



    
]