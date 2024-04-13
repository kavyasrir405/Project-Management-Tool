from django.contrib import admin
from .models import room,Email,Project,Team,CustomUser
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(room)
admin.site.register(Email)
admin.site.register(Project)
admin.site.register(Team)