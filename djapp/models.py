from django.db import models
import string, random

# Create your models here.

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
