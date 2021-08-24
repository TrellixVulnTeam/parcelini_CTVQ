from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .models import UserAPIKey, UserSecretKey
from rest_framework.views import APIView
from rest_framework.response import Response

# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        api_key, key = UserAPIKey.objects.create_key(name=user.username, user_id=user.id)
        UserSecretKey.objects.create(secret=key, key_id=api_key.id)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "key": key
        })


# Login API

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_api_key_id = UserAPIKey.objects.get(user_id=user.id).id
        secret_key = UserSecretKey.objects.get(key_id=user_api_key_id).secret
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "key": secret_key
        })

# Get User API


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user



class UserKeyAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    # serializer_class = LoginSerializer
    def get(self, request, format=None):
        user = self.request.user
        user_api_key_id = UserAPIKey.objects.get(user_id=user.id).id
        secret_key = UserSecretKey.objects.get(key_id=user_api_key_id).secret
        return Response({
            "user" : UserSerializer(user).data,
            "key": secret_key
        })
