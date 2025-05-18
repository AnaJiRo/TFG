# users/permissions.py

from rest_framework.permissions import BasePermission, SAFE_METHODS

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

class IsAdminOrSelf(BasePermission):
    """
    Permite acceso si el usuario es admin o es el dueño del objeto.
    """

    message = 'No tienes permiso para realizar esta acción. Debes ser administrador o el propietario de la cuenta.'

    def has_object_permission(self, request, view, obj):
        # Si es admin: acceso total
        if request.user.role == 'admin':
            return True

        # Si no es admin, solo puede editarse a sí mismo
        return obj == request.user