from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import pytz
from django.core.paginator import Paginator

from .models import Post, Reaction, User, Comment, Notification
from .serializers import *
from rest_framework.authtoken.models import Token

tz = pytz.timezone('Asia/Bangkok')

@api_view(['GET', 'POST'])
def posts_list(request,user=None):
    if request.method == 'GET':
        if user == 'undefined' or user == None:
            data = Post.objects.all().order_by('-date_posted')
        else:
            data = Post.objects.filter(user__name=user).order_by('-date_posted')
        for post in data:
            post.date_posted = post.date_posted.replace(tzinfo=pytz.utc).astimezone(tz)
            post.date_posted = post.date_posted.strftime('%d/%m/%Y %H:%M')

        if 'page' in request.GET:
            all_pages = []
            for page in range(int(request.GET.get('page'))):
                try:
                    this_page = Paginator(data, 5).page(page+1)
                    all_pages += this_page
                except: break
            data = all_pages

        serializer = PostSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        print(request.data)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE']) #'GET',
def posts_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    ### Added by me
    if request.method == 'GET':
        serializer = PostSerializer(post, context={'request': request})

        return Response(serializer.data)
    ### 

    if request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT', 'DELETE']) #'GET',
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_from_token(request,token):
    try:
        user = User.objects.get(user = Token.objects.get(key=token).user)
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)




@api_view(['GET','POST'])
def post_reactions(request, pk=0):
    try:
        reactions = Reaction.objects.filter(post=pk)
    except Reaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ReactionSerializer(reactions, context={'request': request}, many=True)
        return Response(serializer.data)


    elif request.method == 'POST':
        this_reaction = Reaction.objects.filter(post=Post.objects.get(id=request.data['post']),user=User.objects.get(id=request.data['user']))
        if this_reaction:
            this_reaction.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        serializer = ReactionSerializer(data=request.data)
        if serializer.is_valid():
            new_reaction = serializer.save()
            # create notification here
            # if not (User.objects.get(id=request.data['user']) == Post.objects.get(id=request.data['post']).user):
            Notification.objects.create(
                from_user= User.objects.get(id=request.data['user']),
                to_user= Post.objects.get(id=request.data['post']).user,
                post= Post.objects.get(id=request.data['post']),
                reaction= new_reaction,
            )
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def users(request):
    try:
        users = User.objects.all()
    except Reaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(users, context={'request': request}, many=True)
        return Response(serializer.data)




@api_view(['GET','POST'])
def comments(request, pk):
    try:
        comments = Comment.objects.filter(post=pk)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        for comment in comments:
            comment.date_posted = comment.date_posted.replace(tzinfo=pytz.utc).astimezone(tz)
            comment.date_posted = comment.date_posted.strftime('%d/%m/%Y %H:%M')

        serializer = CommentSerializer(comments, context={'request': request}, many=True)
        return Response(serializer.data)


    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            new_comment = serializer.save()
            # create notification here
            # if not (User.objects.get(id=request.data['user']) == Post.objects.get(id=request.data['post']).user):
            Notification.objects.create(
                from_user= User.objects.get(id=request.data['user']),
                to_user= Post.objects.get(id=request.data['post']).user,
                post= Post.objects.get(id=request.data['post']),
                comment= new_comment,
            )
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def notification_detail(request,pk):
    try:
        notifications = Notification.objects.get(pk=pk)
    except Notification.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NotificationSerializer(notifications, context={'request': request})
        return Response(serializer.data)


@api_view(['GET'])
def user_notifications(request,user_pk):
    try:
        notifications = Notification.objects.filter(to_user_id=user_pk).order_by('-pk')
    except Notification.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NotificationSerializer(notifications, context={'request': request}, many=True)
        return Response(serializer.data)