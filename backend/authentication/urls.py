from authentication import views
from django.urls import path

urlpatterns = [
    path('token/', views.generate_token),
    path('validate/', views.validate_token),
    path('revoke/', views.revoke_token),
    path('register/', views.register_user),
]