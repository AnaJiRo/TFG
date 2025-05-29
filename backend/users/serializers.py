from colony.models import Zone
from rest_framework import serializers
from .models import Availability
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username','name', 'email', 'phone', 'password','role' ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # muy importante: encripta la contraseña
        user.role = 'volunteer'
        user.save()
        return user

    def update(self, instance, validated_data):
        # nadie puede cambiar el rol desde aquí, salvo si es admin
        request = self.context.get('request')
        if request and not request.user.is_admin():
            validated_data.pop('role', None)  # eliminamos 'role' si alguien lo intenta modificar

        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)
    
    
class PromoteByEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()


class AvailabilitySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    zone = serializers.PrimaryKeyRelatedField(queryset=Zone.objects.all())

    class Meta:
        model = Availability
        fields = ['id', 'user', 'day', 'zone']
        read_only_fields = ['id', 'user']



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Obtener el token base
        token = super().get_token(user)

        token['role'] = user.role

        return token