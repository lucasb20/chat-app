from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from authentication.serializers import UserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from backend.settings import SECRET_KEY
import jwt

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = JSONParser().parse(request)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=data['username'])
        user.set_password(data['password'])
        user.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def token_user(request):
    data = JSONParser().parse(request)

    check = ('username' in data) and ('password' in data)

    if check:
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            encoded_jwt = jwt.encode({'sub':user.pk}, SECRET_KEY, algorithm="HS256")
            return Response({'access_token':encoded_jwt},status=status.HTTP_201_CREATED)
        else:
            return Response({'Message':'Usuário não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    return Response({"Message":"Formato inválido."},status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_user(request):
    data = JSONParser().parse(request)
    try:
        data_decoded = jwt.decode(data['access_token'],SECRET_KEY,algorithms=["HS256",])
    except jwt.exceptions.DecodeError as e:
        return Response({'Message':str(e)}, status.HTTP_400_BAD_REQUEST)
    except KeyError as e:
        return Response({'Message':str(e)}, status.HTTP_400_BAD_REQUEST)

    return Response({**data_decoded}, status.HTTP_202_ACCEPTED)