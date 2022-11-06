from django.db import models
from django.conf import settings
from django.utils import timezone

print(timezone.now())

# Create your models here.
class User(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    avatar = models.ImageField(default="",blank=True,null=True)
    cover = models.ImageField(default="",blank=True,null=True)

    def __str__(self):
        return "{}".format(self.name) 


class Post(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.TextField(blank=True,null=True)
    media = models.ImageField(default=None,blank=True,null=True)
    date_posted = models.DateTimeField(default=timezone.now)
    privacy = models.CharField(max_length=50,default='public')

    def __str__(self):
        return "{} - {}".format(self.content,self.user) 

class Reaction_type(models.Model):
    name = models.CharField(max_length=20)
    svg = models.TextField(default="")

    def __str__(self):
        return "{}".format(self.name) 

class Reaction(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    type = models.ForeignKey(Reaction_type, on_delete=models.CASCADE)

    def __str__(self):
        return "{} - {} - {}".format(self.user,self.post.id,self.type.name) 


class Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{} - {}".format(self.content,self.user) 



class Notification(models.Model):
    from_user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='from_user')
    to_user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='to_user')
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    reaction = models.ForeignKey(Reaction,on_delete=models.CASCADE,null=True,blank=True)
    comment = models.ForeignKey(Comment,on_delete=models.CASCADE,null=True,blank=True)
    read = models.BooleanField(default=False)
