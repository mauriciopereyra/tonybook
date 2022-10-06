from django.contrib import admin
from .models import Post, Reaction, Reaction_type, User, Comment, Notification
# Register your models here.
admin.site.register(Post)
admin.site.register(Reaction)
admin.site.register(Reaction_type)
admin.site.register(User)
admin.site.register(Comment)
admin.site.register(Notification)