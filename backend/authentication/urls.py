from authentication import views
from django.urls import path

urlpatterns = [
    path('token/', views.token_user),
    path('verify/', views.verify_user),
    path('register/', views.register_user),
    path('revoke/', views.revoke_user),
]