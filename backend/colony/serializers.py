from rest_framework import serializers
from .models import Zone, Colony

from .models import Assignment
from users.models import Availability
from django.contrib.auth import get_user_model


User = get_user_model()

class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = "__all__"


class ColonySerializer(serializers.ModelSerializer):
    zone = serializers.SlugRelatedField(slug_field="name", queryset=Zone.objects.all())
    size = serializers.IntegerField(required=False, allow_null=True)
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



class AssignmentBulkUpdateSerializer(serializers.Serializer):
    monday = serializers.IntegerField(allow_null=True, required=False)
    tuesday = serializers.IntegerField(allow_null=True, required=False)
    wednesday = serializers.IntegerField(allow_null=True, required=False)
    thursday = serializers.IntegerField(allow_null=True, required=False)
    friday = serializers.IntegerField(allow_null=True, required=False)
    saturday = serializers.IntegerField(allow_null=True, required=False)
    sunday = serializers.IntegerField(allow_null=True, required=False)

    def validate(self, data):
        for day, volunteer_id in data.items():
            if volunteer_id is not None:
                if not User.objects.filter(id=volunteer_id).exists():
                    raise serializers.ValidationError({day: "El voluntario no existe."})
        return data
