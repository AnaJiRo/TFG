from rest_framework import serializers
from .models import Zone, Colony

from .models import Assignment
from users.models import Availability


class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = "__all__"


class ColonySerializer(serializers.ModelSerializer):
    zone = serializers.SlugRelatedField(slug_field="name", queryset=Zone.objects.all())

    class Meta:
        model = Colony
        fields = "__all__"


# --- Assignment Serializer ---
class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ["id", "colony", "volunteer", "day", "frequency"]

    def validate(self, data):
        colony = data.get("colony")
        volunteer = data.get("volunteer")
        day = data.get("day")

        # El voluntario debe tener disponibilidad ese día en la zona de la colonia
        if not Availability.objects.filter(
            user=volunteer, day=day, zone=colony.zone
        ).exists():
            raise serializers.ValidationError(
                "El voluntario no tiene disponibilidad ese día en la zona de la colonia."
            )

        # No más de una asignación por colonia y día
        if Assignment.objects.filter(colony=colony, day=day).exists():
            raise serializers.ValidationError(
                "Ya existe una asignación para esta colonia y día."
            )

        # No más de una asignación por voluntario y día
        if Assignment.objects.filter(volunteer=volunteer, day=day).exists():
            raise serializers.ValidationError(
                "Ya existe una asignación para este voluntario y día."
            )

        return data
