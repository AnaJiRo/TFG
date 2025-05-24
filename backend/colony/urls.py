from django.urls import path
from .views import ZoneListCreateView, ZoneDetailView, ColonyListCreateView, ColonyDetailView

urlpatterns = [
    path('zones/', ZoneListCreateView.as_view(), name='zone-list-create'),
    path('zones/<int:pk>/', ZoneDetailView.as_view(), name='zone-detail'),
    path('colonies/', ColonyListCreateView.as_view(), name='colony-list-create'),
    path('colonies/<int:pk>/', ColonyDetailView.as_view(), name='colony-detail'),
]

