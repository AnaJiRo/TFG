from users.models import Availability

# Endpoint para asignaciones disponibles
from rest_framework.views import APIView


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
        colony_id = self.kwargs.get("colony_id")
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
        days = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ]
        result = []

        # Si es admin, ve todas las colonias y todos los días con voluntarios asignados y voluntarios_disponibles
        if hasattr(user, "role") and user.role == "admin" or user.is_superuser:
            from .models import Colony

            colonies = Colony.objects.all()
            for colony in colonies:
                assignments = Assignment.objects.filter(colony=colony)
                summary = {day: None for day in days}
                for assignment in assignments:
                    summary[assignment.day] = (
                        assignment.volunteer.name if assignment.volunteer else None
                    )
                assigned_users = Assignment.objects.filter(colony=colony).values_list(
                    "volunteer_id", "day"
                )
                availability_by_day = {}
                for day in days:
                    availability = (
                        Availability.objects.filter(zone=colony.zone, day=day)
                        .exclude(user_id__in=[v for v, d in assigned_users if d == day])
                        .values("user")
                        .distinct()
                        .count()
                    )
                    availability_by_day[day] = availability
                result.append(
                    {
                        "id": colony.id,
                        "colonia": colony.name,
                        "asignaciones": summary,
                        "voluntarios_disponibles": availability_by_day,
                        "zona": colony.zone.name if colony.zone else None,
                    }
                )
            return Response(result)

        # Si es voluntario, ve todas las colonias donde está asignado y los días que tiene asignados (sin voluntarios_disponibles)
        else:
            assignments = Assignment.objects.filter(volunteer=user)
            colonies = {}
            for assignment in assignments:
                colony_name = assignment.colony.name
                if colony_name not in colonies:
                    colonies[colony_name] = {day: None for day in days}
                colonies[colony_name][assignment.day] = (
                    user.name
                    if hasattr(user, "name")
                    else user.get_full_name() or user.username
                )
            for assignment in assignments:
                colony = assignment.colony
                result.append(
                    {"colonia": colony.name, "asignaciones": colonies[colony.name]}
                )
            return Response(result)


class AssignmentColonySummaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, colony_id):
        from users.models import Availability

        user = request.user
        days = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ]
        colony = get_object_or_404(Colony, id=colony_id)

        # Asignaciones por día
        assignments = Assignment.objects.filter(colony=colony)
        summary = {day: None for day in days}
        for assignment in assignments:
            summary[assignment.day] = (
                assignment.volunteer.name if assignment.volunteer else None
            )
        assigned_users = Assignment.objects.filter(colony=colony).values_list(
            "volunteer_id", "day"
        )
        availability_by_day = {}
        for day in days:
            availability = (
                Availability.objects.filter(zone=colony.zone, day=day)
                .exclude(user_id__in=[v for v, d in assigned_users if d == day])
                .values("user")
                .distinct()
                .count()
            )
            availability_by_day[day] = availability
        result = {
            "id": colony.id,
            "colonia": colony.name,
            "asignaciones": summary,
            "voluntarios_disponibles": availability_by_day,
            "zona": colony.zone.name if colony.zone else None,
            "ubicacion": colony.ubication,
        }
        return Response(result)


class AvailableAssignmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, colony_id):
        """
        Devuelve todas las asignaciones posibles (día, voluntario) para una colonia determinada.
        Incluye los voluntarios disponibles y el que ya está asignado a ese día.
        """
        colony = get_object_or_404(Colony, id=colony_id)
        days = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ]

        availabilities = Availability.objects.filter(zone=colony.zone)
        assigned = Assignment.objects.filter(colony=colony)
        assigned_pairs = set((a.volunteer_id, a.day) for a in assigned)
        asignado_por_dia = {a.day: a.volunteer_id for a in assigned}

        available = []

        for av in availabilities:
            ya_asignado_id = asignado_por_dia.get(av.day)

            if (
                av.user_id,
                av.day,
            ) not in assigned_pairs or av.user_id == ya_asignado_id:
                available.append(
                    {
                        "volunteer_id": av.user_id,
                        "volunteer_email": av.user.email,
                        "volunteer_name": getattr(av.user, "name", av.user.username),
                        "day": av.day,
                    }
                )

        return Response(available)
