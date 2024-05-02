from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(CustomUser)

admin.site.register(Email)
admin.site.register(Project)
admin.site.register(Team)

admin.site.register(Epic)
