from django.db import models
from django.conf import settings

class Zone(models.Model):
    name = models.CharField(max_length=100)
    locality = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.locality})"


class Colony(models.Model):
    name = models.CharField(max_length=100, unique=True)
    ubication = models.CharField(max_length=255)
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE, related_name='colonies')
    size = models.PositiveIntegerField(help_text="Tamaño de la colonia (número de animales)")

    def __str__(self):
        return f"{self.name} - {self.zone.name}"

class Assignment(models.Model):
    DAYS_OF_WEEK = [
        ("monday", "Monday"),
        ("tuesday", "Tuesday"),
        ("wednesday", "Wednesday"),
        ("thursday", "Thursday"),
        ("friday", "Friday"),
        ("saturday", "Saturday"),
        ("sunday", "Sunday"),
    ]
    colony = models.ForeignKey(Colony, on_delete=models.CASCADE, related_name="assignments")
    volunteer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="assignments")
    day = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
    frequency = models.IntegerField(default=3, help_text="Ratio indicating that a volunteer goes to a colony on a specific day")

    class Meta:
        unique_together = [
            ("colony", "day"),
            ("volunteer", "day"),
        ]

    def __str__(self):
        return f"{self.colony.name} - {self.day} - {self.volunteer.email}"
