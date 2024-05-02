from django.db import models
from django.contrib.auth.models import AbstractUser
import random
import string
def generate_user_id():
    length = 10
    code = ''.join(['user'] + random.choices('0123456789', k=length))
    while CustomUser.objects.filter(user_id=code).exists():
        code = ''.join(['user'] + random.choices('0123456789', k=length))
    return code


    def _str_(self):
        return  f"{self.username} - {self.user_id}"
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

