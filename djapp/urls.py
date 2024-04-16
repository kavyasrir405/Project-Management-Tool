
from django.urls import include, path
from .views import room_view,CreateRoomView,SendEmailView,CreateProjectView,HomeView, LogoutView
urlpatterns = [
    path('', room_view.as_view()),
    path('/create', SendEmailView.as_view()),
    path('/email', SendEmailView.as_view()),
    path('/proj',  CreateProjectView.as_view()),
    # path('/login',  LoginUserView.as_view())
    path('home/', HomeView.as_view(), name= 'home'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
]