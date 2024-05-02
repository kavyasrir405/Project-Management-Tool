from django.db import models
import string, random
from django.contrib.auth.models import AbstractUser
# Create your models here.


def generate_user_id():
    length = 10
    code = ''.join(['user'] + random.choices('0123456789', k=length))
    while CustomUser.objects.filter(user_id=code).exists():
        code = ''.join(['user'] + random.choices('0123456789', k=length))
    return code

class CustomUser(AbstractUser):
    user_id=models.CharField(max_length=100, default=generate_user_id,primary_key=True,unique=True)

    def __str__(self):
        return  f"{self.username} - {self.user_id}"



def generate_unique_code():
    length=6
    
    while True:
        code= ''.join(random.choices(string.ascii_uppercase, k=length))

        if room.objects.filter(code=code).count()==0:
            break
    return code





class Email(models.Model):
    recipient = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

def generate_project_id():
    length = 10
    code = ''.join(['proj'] + random.choices('0123456789', k=length))
    while Project.objects.filter(projectid=code).exists():
        code = ''.join(['proj'] + random.choices('0123456789', k=length))
    return code

def generate_team_id():
    length = 10
    code = ''.join(['team'] + random.choices('0123456789', k=length))
    while Team.objects.filter(teamid=code).exists():
        code = ''.join(['team'] + random.choices('0123456789', k=length))
    return code



class Project(models.Model):
    projectid = models.CharField(primary_key=True, max_length=20, default=generate_project_id)
    projectname = models.CharField(max_length=100)
    teamlead_mail=models.EmailField(default="abc@gmail.com", null=True)
    
    teamid = models.ForeignKey('Team', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.projectname
    
class Team(models.Model):
    teamid = models.CharField(primary_key=True, max_length=20, default=generate_team_id)
    useremail = models.EmailField(default="abc@gmail.com", null=True)
    

    def __str__(self):
        return f'Team - {self.teamid}'
    


class Epic(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()


class Sprint(models.Model):
    sprint = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    sprint_goal=models,models.TextField()

class backlog(models.Model):
    backlogName = models.CharField(max_length=30)
    backlogId = models.CharField(max_length=20, unique=True)
    sprint = models.ForeignKey(Sprint, on_delete=models.SET_NULL, null=True, blank=True)

    def generate_unique_backlog_id(self):
        unique_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        return f"backlog_{unique_id}"

    def save(self, *args, **kwargs):
        if not self.backlogId:
            self.backlogId = self.generate_unique_backlog_id()
        super().save(*args, **kwargs)
