
from django.urls import path
from .views import AssignmentBulkUpdateView, ZoneListCreateView, ZoneDetailView, ColonyListCreateView, ColonyDetailView, AssignmentListCreateView, AssignmentRetrieveUpdateDestroyView, AssignmentSummaryView, AssignmentColonySummaryView, AvailableAssignmentsView, AvailableVolunteersByZoneView

urlpatterns = [
    path('zones/', ZoneListCreateView.as_view(), name='zone-list-create'),
    path('zones/<int:pk>/', ZoneDetailView.as_view(), name='zone-detail'),
    path('zones/<int:zone_id>/available-volunteers/', AvailableVolunteersByZoneView.as_view(), name='available-volunteers-by-zone'),
    path('colonies/', ColonyListCreateView.as_view(), name='colony-list-create'),
    path('colonies/<int:pk>/', ColonyDetailView.as_view(), name='colony-detail'),
    path('colonies/<int:colony_id>/assignments/', AssignmentListCreateView.as_view(), name='assignment-list-create'),
    path('colonies/<int:colony_id>/available-assignments/', AvailableAssignmentsView.as_view(), name='available-assignments'),
    path('colonies/assignments/summary/', AssignmentSummaryView.as_view(), name='assignment-summary'),
    path('colonies/assignments/summary/<int:colony_id>/', AssignmentColonySummaryView.as_view(), name='assignment-colony-summary'),
    path('assignments/<int:pk>/', AssignmentRetrieveUpdateDestroyView.as_view(), name='assignment-detail'),
    path('colonies/<int:colony_id>/assignments/bulk/', AssignmentBulkUpdateView.as_view(), name='assignment-bulk-update'),

]

