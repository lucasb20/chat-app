from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from authentication.serializers import UserLoginSerializer, UserSerializer, AccessTokenSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from authentication.permissions import IsAuthenticated
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
        return Response({"message":"User created."},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_token(request):
    data = JSONParser().parse(request)
    serializer = UserLoginSerializer(data=data)
    if serializer.is_valid():
        user = authenticate(**serializer.validated_data)
        if user is not None:
            encoded_jwt = jwt.encode({'sub':user.pk, "exp": datetime.now(tz=timezone.utc) + timedelta(days=1)}, SECRET_KEY, algorithm="HS256")
            return Response({'access_token':encoded_jwt},status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Invalid user.'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def validate_token(request):
    try:
        token = request.headers["Authorization"]
        decoded_jwt = jwt.decode(token,SECRET_KEY, options={"require": ["sub", "exp"]},algorithms=["HS256",])
    except Exception as e:
        return Response({'message':str(e)}, status.HTTP_400_BAD_REQUEST)

    if token in BLACKLIST:
        return Response({'message':'Access denied.'}, status.HTTP_404_NOT_FOUND)
    
    user = User.objects.get(pk = decoded_jwt["sub"])

    return Response({'message':'Access accepted.', 'username' : user.username}, status.HTTP_202_ACCEPTED)

@api_view(['POST'])
@permission_classes([AllowAny])
def revoke_token(request):
    data = JSONParser().parse(request)
    serializer = AccessTokenSerializer(data=data)
    if serializer.is_valid():
        try:
            token = serializer.validated_data["access_token"]
            jwt.decode(token,SECRET_KEY, options={"require": ["sub", "exp"]},algorithms=["HS256",])
            BLACKLIST.add(token)
        except Exception as e:
            return Response({'message':str(e)}, status.HTTP_404_NOT_FOUND)
        return Response({'message':'Token revoked.'}, status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
