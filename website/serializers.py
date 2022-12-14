from rest_framework import serializers
from .models import Post, Reaction, User, Comment, Notification, Reaction_type


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post 
        fields = ('pk', 'user', 'content', 'media','date_posted', 'privacy')

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment 
        fields = ('pk', 'user','post', 'content', 'date_posted')

class ReactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reaction 
        fields = ('pk', 'user', 'post', 'type')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User 
        fields = ('pk', 'user', 'name', 'avatar', 'cover')


class ReactionTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reaction_type
        fields = ('pk', 'name', 'svg')


class NotificationSerializer(serializers.ModelSerializer):
    user_info = UserSerializer(source='from_user')
    post_info = PostSerializer(source='post')

    class Meta:
        model = Notification 
        fields = ('pk', 'from_user', 'to_user', 'post','reaction','comment', 'read','user_info','post_info')
