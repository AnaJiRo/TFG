# users/views.py
from rest_framework.views import APIView
from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin
from rest_framework.response import Response    
from rest_framework import status
from .serializers import PromoteByEmailSerializer

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
    permission_classes = [IsAuthenticated] # --> Requiere estar logueado.

class PromoteByEmailView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def patch(self, request):
        serializer = PromoteByEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            if user.role == 'admin':
                return Response({'detail': 'Este usuario ya es administrador.'}, status=status.HTTP_400_BAD_REQUEST)

            user.role = 'admin'
            user.save()
            return Response({'detail': f'{user.username} ahora es administrador.'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)