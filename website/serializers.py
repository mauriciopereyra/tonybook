from rest_framework import serializers
from .models import Post, Reaction, User

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post 
        fields = ('pk', 'user', 'content', 'media','date_posted', 'privacy')

class ReactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reaction 
        fields = ('pk', 'user', 'post', 'type')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User 
        fields = ('pk', 'user', 'name', 'avatar')