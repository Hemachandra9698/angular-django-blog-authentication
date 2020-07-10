from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import logout
from rest_framework import viewsets, permissions
from . import serializers

from django.contrib import messages
from .models import *
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.AllowAny]


class PostView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        data = serializers.PostSerializer(posts, many=True).data;
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        if hasattr(request, 'user') and request.user:
            data = request.data
            post = Post(user=request.user, desc=data['desc'])
            post.save()
            return Response({'message': 'added post successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'User not Authenticated'}, status=status.HTTP_403_FORBIDDEN)


class Login(APIView):

    def post(self, request):
        data = request.data
        username = data.get('username', '')
        password = data.get('password', '')
        email = data.get('email', '')
        if username and password and email:
            user = User(username=username, password=password, email=email)
            user.save()

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(request.user)
        token = jwt_encode_handler(payload)
        if request.user.is_authenticated:
            return Response({'message': 'Valid'}, status=status.HTTP_200_OK)
        return Response({'message': 'Valid'}, status=status.HTTP_200_OK)


def logoutUser(request):
    logout(request)
    return redirect('login')


class UserPermissions(APIView):
    def post(self, request):
        if hasattr(request, 'user') and request.user:
            user = request.user
            user_groups = user.groups.all().values('name')
            for group in user_groups:
                if 'updator' == group['name']:
                    return Response({'message': True}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Not Authenticated'}, status=status.HTTP_403_FORBIDDEN)
