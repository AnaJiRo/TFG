from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsAdmin
from .models import Zone, Colony
from .models import Assignment
from .serializers import ZoneSerializer, ColonySerializer, AssignmentSerializer
from users.models import CustomUser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


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



# --- Assignment Views ---
class AssignmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        colony_id = self.kwargs.get('colony_id')
        return Assignment.objects.filter(colony_id=colony_id)

    def perform_create(self, serializer):
        return serializer.save()


class AssignmentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


class AssignmentSummaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, colony_id):
        colony = get_object_or_404(Colony, id=colony_id)
        assignments = Assignment.objects.filter(colony=colony)
        days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        summary = {day: None for day in days}
        for assignment in assignments:
            summary[assignment.day] = assignment.volunteer.name if assignment.volunteer else None
        return Response({
            "colonia": colony.name,
            "asignaciones": summary
        })
