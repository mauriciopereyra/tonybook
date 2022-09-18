from django.db import models

# Create your models here.
class Post(models.Model):
    user = models.TextField()
    content = models.TextField()
    date_posted = models.DateTimeField()
    privacy = models.CharField(max_length=50)
