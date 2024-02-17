from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from authentication.serializers import UserSerializer
from django.contrib.auth import authenticate
from backend.settings import SECRET_KEY
import jwt
from datetime import datetime, timedelta, timezone
from authentication.blacklist import BLACKLIST

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = JSONParser().parse(request)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_token(request):
    data = JSONParser().parse(request)
    username = data['username']
    password = data['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        encoded_jwt = jwt.encode({'sub':user.pk, "exp": datetime.now(tz=timezone.utc) + timedelta(days=1)}, SECRET_KEY, algorithm="HS256")
        return Response({'access_token':encoded_jwt},status=status.HTTP_201_CREATED)
    return Response({'message':'Invalid user.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny])
def validate_token(request):
    data = JSONParser().parse(request)
    try:
        jwt.decode(data['access_token'],SECRET_KEY, options={"require": ["sub", "exp"]},algorithms=["HS256",])
    except Exception as e:
        return Response({'message':str(e)}, status.HTTP_400_BAD_REQUEST)

    if data['access_token'] in BLACKLIST:
        return Response({'message':'Access denied.'}, status.HTTP_404_NOT_FOUND)

    return Response({'message':'Access accepted.'}, status.HTTP_202_ACCEPTED)

@api_view(['POST'])
@permission_classes([AllowAny])
def revoke_token(request):
    data = JSONParser().parse(request)
    try:
        jwt.decode(data['access_token'],SECRET_KEY, options={"require": ["sub", "exp"]},algorithms=["HS256",])
        BLACKLIST.add(data['access_token'])
    except Exception as e:
        return Response({'message':str(e)}, status.HTTP_404_NOT_FOUND)

    return Response({'message':'Token revoked.'}, status.HTTP_200_OK)
