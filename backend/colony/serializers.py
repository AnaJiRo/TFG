from rest_framework import serializers
from .models import Zone, Colony

class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = "__all__"


class ColonySerializer(serializers.ModelSerializer):
    zone = serializers.SlugRelatedField(slug_field='name', queryset=Zone.objects.all())

    class Meta:
        model = Colony
        fields = "__all__"
