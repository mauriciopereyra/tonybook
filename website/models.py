from django.db import models
from django.conf import settings

# Create your models here.
class User(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    avatar = models.ImageField(default="",blank=True,null=True)

    def __str__(self):
        return "{}".format(self.name) 

class Post(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.TextField()
    media = models.ImageField(default="",blank=True,null=True)
    date_posted = models.DateTimeField()
    privacy = models.CharField(max_length=50)

    def __str__(self):
        return "{} - {}".format(self.content,self.user) 

class Reaction_type(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return "{}".format(self.name) 

class Reaction(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    type = models.ForeignKey(Reaction_type, on_delete=models.CASCADE)

    def __str__(self):
        return "{} - {} - {}".format(self.user,self.post.id,self.type.name) 