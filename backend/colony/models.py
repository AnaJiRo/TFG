from django.db import models

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
