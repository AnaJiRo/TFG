from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROL_CHOICES = (
        ('admin', 'Administrador'),
        ('voluntary', 'Voluntario'),
    )

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    rol = models.CharField(max_length=10, choices=ROL_CHOICES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name', 'rol']

    def __str__(self):
        return self.email