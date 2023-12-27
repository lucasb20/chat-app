from authentication import views
from django.urls import path

urlpatterns = [
    path('token/', views.token_user),
    path('refresh/', views.refresh_user),
    path('verify/', views.verify_user),
    path('blacklist/', views.blacklist_user),
    path('register/', views.register_user),
]