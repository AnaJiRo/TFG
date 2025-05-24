from django.db import models

class Zone(models.Model):
    name = models.CharField(max_length=100)
    locality = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.locality})"
