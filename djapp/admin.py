from django.contrib import admin
from .models import *
from django import forms
# Register your models here.
class BacklogAdmin(admin.ModelAdmin):
    fields = ['backlogName', 'projectId', 'sprint','backlogId']
    readonly_fields = ['backlogId'] 

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'projectId' or db_field.name == 'sprint':
            kwargs['widget'] = forms.TextInput()  # Use TextInput widget for projectId and sprint fields
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

admin.site.register(backlog, BacklogAdmin)
admin.site.register(CustomUser)

admin.site.register(Email)
admin.site.register(Project)
admin.site.register(Team)

admin.site.register(Epic)



class SprintAdminForm(forms.ModelForm):
    class Meta:
        model = Sprint
        fields = '__all__'
        widgets = {
            'project': forms.TextInput(),  # Display project_Id as a text input
        }

class SprintAdmin(admin.ModelAdmin):
    form = SprintAdminForm

admin.site.register(Sprint, SprintAdmin)
