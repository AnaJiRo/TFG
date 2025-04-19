# users/views.py

from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
    

User = get_user_model()

class RegisterUserView(generics.CreateAPIView):
    """ Crear un usuario """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ListUserView(generics.ListAPIView):
    """ Listar todos los usuarios """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RetrieveUserView(generics.RetrieveAPIView):
    """ Mostrar ususario """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

class UpdateUserView(generics.UpdateAPIView):
    """ Editar usuario: put todo el usuario, path un campo en concreto"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated] # --> Requiere estar logueado.

class DeleteUserView(generics.DestroyAPIView):
    """ Eliminar usuario """
    queryset = User.objects.all()
    lookup_field = 'id'
    