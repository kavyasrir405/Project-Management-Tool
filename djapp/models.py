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
    # user_id=models.CharField(max_length=100, default=generate_user_id,primary_key=True,unique=True)
    id = models.AutoField(primary_key=True)
    email = models.models.EmailField()
    def __str__(self):
        return  f"{self.username} - {self.user_id}"

def AboutMe():
    id = models.AutoField(models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE))



def generate_unique_code():
    length=6
    
    while True:
        code= ''.join(random.choices(string.ascii_uppercase, k=length))

        if room.objects.filter(code=code).count()==0:
            break
    return code



class room(models.Model):
    code=models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host=models.CharField(max_length=50, unique=True)
    guest_Can_pause= models.BooleanField(null=False,default=False)
    votes_to_skip= models.IntegerField(null=False, default=1)
    created_at= models.DateField(auto_now_add=True)

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
    teamid = models.ForeignKey('Team', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.projectname
    
class Team(models.Model):
    teamid = models.CharField(primary_key=True, max_length=20, default=generate_team_id)

    def __str__(self):
        return f'Team - {self.teamid}'
    
class TeamMember(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    useremail = models.EmailField(unique=True)

    def __str__(self):
        return self.useremail

