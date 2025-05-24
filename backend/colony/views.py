from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsAdmin
from .models import Zone, Colony
from .serializers import ZoneSerializer, ColonySerializer


class ZoneListCreateView(generics.ListCreateAPIView):
    serializer_class = ZoneSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    
    def get_queryset(self):
        queryset = Zone.objects.all()
        locality = self.request.query_params.get("locality")
        if locality:
            queryset = queryset.filter(locality__iexact=locality)
        return queryset

class ZoneDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


class ColonyListCreateView(generics.ListCreateAPIView):
    serializer_class = ColonySerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        queryset = Colony.objects.all()
        zone = self.request.query_params.get("zone")
        if zone:
            queryset = queryset.filter(zone__name__iexact=zone)
        return queryset


class ColonyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Colony.objects.all()
    serializer_class = ColonySerializer
    permission_classes = [IsAuthenticated, IsAdmin]
