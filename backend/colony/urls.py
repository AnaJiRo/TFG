from django.urls import path
from .views import ZoneListCreateView, ZoneDetailView

urlpatterns = [
    path('zones/', ZoneListCreateView.as_view(), name='zone-list-create'),
    path('zones/<int:pk>/', ZoneDetailView.as_view(), name='zone-detail'),
]

