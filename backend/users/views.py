from rest_framework.views import APIView
from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import AvailabilityBulkUpdateSerializer, CustomTokenObtainPairSerializer, UserSerializer, AvailabilitySerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin, IsAdminOrSelf
from rest_framework.response import Response    
from rest_framework import status
from .serializers import PromoteByEmailSerializer
from .models import Availability
from rest_framework_simplejwt.views import TokenObtainPairView


class MyAvailabilityListCreateView(generics.ListCreateAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'role') and user.role == 'admin':
            return Availability.objects.all()
        return Availability.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AllAvailabilityListView(generics.ListAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = Availability.objects.all()

class AvailabilityDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [IsAuthenticated, IsAdminOrSelf]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Availability.objects.all()
        return Availability.objects.filter(user=user)
    
class AvailabilityBulkUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = AvailabilityBulkUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        zone_id = serializer.validated_data['zone_id']
        selected_days = set(serializer.validated_data['days'])

        # 1. Obtener todas las disponibilidades actuales del usuario
        current_availabilities = Availability.objects.filter(user=user)
        current_days = set(current_availabilities.values_list('day', flat=True))

        # 2. Crear las nuevas (que no existen)
        for day in selected_days - current_days:
            Availability.objects.create(
                user=user,
                day=day,
                zone_id=zone_id
            )

        # 3. Eliminar las que ya no están seleccionadas
        Availability.objects.filter(user=user, day__in=(current_days - selected_days)).delete()

        return Response({"message": "Disponibilidad actualizada correctamente."}, status=status.HTTP_200_OK)
## Obtener todas las disponibilidades de un usuario
class UserAvailabilityListView(generics.ListAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Availability.objects.filter(user__id=user_id)



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
    permission_classes = [IsAuthenticated, IsAdminOrSelf] # --> Requiere estar logueado.

class DeleteUserView(generics.DestroyAPIView):
    """ Eliminar usuario """
    queryset = User.objects.all()
    lookup_field = 'id'
    permission_classes = [IsAuthenticated, IsAdminOrSelf] # --> Requiere estar logueado.

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
    


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
