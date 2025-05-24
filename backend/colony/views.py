from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsAdmin
from .models import Zone
from .serializers import ZoneSerializer


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
