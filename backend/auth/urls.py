from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from django.urls import path

urlpatterns = [
    path('refresh/', refresh_jwt_token),
    path('verify/', verify_jwt_token),
    path('login/', obtain_jwt_token),
]