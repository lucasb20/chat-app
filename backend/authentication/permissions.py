from rest_framework.permissions import BasePermission

class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        if "Authorization" in request.headers:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        return False