from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Post, Reaction, User
from .serializers import *

@api_view(['GET', 'POST'])
def posts_list(request):
    if request.method == 'GET':
        data = Post.objects.all()

        serializer = PostSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE']) #'GET',
def posts_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # ### Added by me
    # if request.method == 'GET':
    #     serializer = PostSerializer(post, context={'request': request})

    #     return Response(serializer.data)
    # ### 

    if request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






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
            serializer.save()
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