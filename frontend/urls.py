from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('home', index),

    
      # path('room/<str:roomCode>', index),
    # path('project', index),
    # path('join/1', index)
]