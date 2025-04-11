from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# --- Usuario personalizado ---
class Usuario(AbstractUser):
    ROL_CHOICES = [
        ('admin', 'Administrador'),
        ('voluntario', 'Voluntario'),
    ]
    rol = models.CharField(max_length=20, choices=ROL_CHOICES)
    telefono = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.get_full_name()} ({self.get_rol_display()})"

# --- Zona ---
class Zona(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

# --- Colonia ---
class Colonia(models.Model):
    TAMANIO_CHOICES = [
        ('pequeña', 'Pequeña'),
        ('mediana', 'Mediana'),
        ('grande', 'Grande'),
    ]
    nombre = models.CharField(max_length=100)
    ubicación = models.CharField(max_length=200)
    estado = models.CharField(max_length=100)
    tamaño = models.CharField(max_length=20, choices=TAMANIO_CHOICES)
    notas = models.TextField(blank=True)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

# --- Disponibilidad del voluntario ---
class Disponibilidad(models.Model):
    DIAS_SEMANA = [
        ('lunes', 'Lunes'),
        ('martes', 'Martes'),
        ('miércoles', 'Miércoles'),
        ('jueves', 'Jueves'),
        ('viernes', 'Viernes'),
        ('sábado', 'Sábado'),
        ('domingo', 'Domingo'),
    ]
    día_semana = models.CharField(max_length=10, choices=DIAS_SEMANA)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.usuario} - {self.día_semana} ({self.zona})"

# --- Asignación de voluntarios a colonias ---
class Asignacion(models.Model):
    fecha = models.DateField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    colonia = models.ForeignKey(Colonia, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.fecha} - {self.usuario} -> {self.colonia}"
