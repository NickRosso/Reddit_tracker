from django.db import models

# Create your models here.
class Activity_metrics(models.Model):
    Created_date = models.DateTimeField(auto_now_add=True)
    Subreddit = models.CharField(max_length=1024, default="")
    Total_members = models.IntegerField(max_length=1024)
    Online_members = models.IntegerField(max_length=1024)

class Meta:
    ordering = ['Created_date',]