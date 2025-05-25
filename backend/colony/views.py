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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from users.models import Availability
        user = request.user
        days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        result = []

        # Si es admin, ve todas las colonias y todos los días con voluntarios asignados y voluntarios_disponibles
        if hasattr(user, 'role') and user.role == 'admin' or user.is_superuser:
            from .models import Colony
            colonies = Colony.objects.all()
            for colony in colonies:
                assignments = Assignment.objects.filter(colony=colony)
                summary = {day: None for day in days}
                for assignment in assignments:
                    summary[assignment.day] = assignment.volunteer.name if assignment.volunteer else None
                assigned_users = Assignment.objects.filter(colony=colony).values_list('volunteer_id', 'day')
                availability_by_day = {}
                for day in days:
                    availability = Availability.objects.filter(zone=colony.zone, day=day).exclude(user_id__in=[v for v, d in assigned_users if d == day]).values('user').distinct().count()
                    availability_by_day[day] = availability
                result.append({
                    "colonia": colony.name,
                    "asignaciones": summary,
                    "voluntarios_disponibles": availability_by_day
                })
            return Response(result)

        # Si es voluntario, ve todas las colonias donde está asignado y los días que tiene asignados (sin voluntarios_disponibles)
        else:
            assignments = Assignment.objects.filter(volunteer=user)
            colonies = {}
            for assignment in assignments:
                colony_name = assignment.colony.name
                if colony_name not in colonies:
                    colonies[colony_name] = {day: None for day in days}
                colonies[colony_name][assignment.day] = user.name if hasattr(user, 'name') else user.get_full_name() or user.username
            for assignment in assignments:
                colony = assignment.colony
                result.append({
                    "colonia": colony.name,
                    "asignaciones": colonies[colony.name]
                })
            return Response(result)
