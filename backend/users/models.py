from colony.models import Zone
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
    role = models.CharField(max_length=10, choices=ROL_CHOICES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name', 'role']

    def __str__(self):
        return self.email



class Availability(models.Model):
    DAYS_OF_WEEK = [
        ("monday", "Monday"),
        ("tuesday", "Tuesday"),
        ("wednesday", "Wednesday"),
        ("thursday", "Thursday"),
        ("friday", "Friday"),
        ("saturday", "Saturday"),
        ("sunday", "Sunday"),
    ]
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='availabilities')
    day = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE, related_name='availabilities')

    class Meta:
        unique_together = ("user", "day")
        verbose_name_plural = "Availabilities"

    def __str__(self):
        return f"{self.user.email} - {self.day} - {self.zone.name}"