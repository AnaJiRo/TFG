# users/permissions.py

from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Permite acceso solo a usuarios con rol 'admin'.
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'admin'
        )
