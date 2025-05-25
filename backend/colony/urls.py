
from django.urls import path
from .views import ZoneListCreateView, ZoneDetailView, ColonyListCreateView, ColonyDetailView, AssignmentListCreateView, AssignmentRetrieveUpdateDestroyView, AssignmentSummaryView

urlpatterns = [
    path('zones/', ZoneListCreateView.as_view(), name='zone-list-create'),
    path('zones/<int:pk>/', ZoneDetailView.as_view(), name='zone-detail'),
    path('colonies/', ColonyListCreateView.as_view(), name='colony-list-create'),
    path('colonies/<int:pk>/', ColonyDetailView.as_view(), name='colony-detail'),
    path('colonies/<int:colony_id>/assignments/', AssignmentListCreateView.as_view(), name='assignment-list-create'),
    path('colonies/assignments/summary/', AssignmentSummaryView.as_view(), name='assignment-summary'),
    path('assignments/<int:pk>/', AssignmentRetrieveUpdateDestroyView.as_view(), name='assignment-detail'),
]

