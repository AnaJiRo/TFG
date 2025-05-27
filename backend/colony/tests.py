
import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import CustomUser, Availability
from .models import Zone, Colony, Assignment

@pytest.mark.django_db
def test_assignment_summary_admin():
    admin = CustomUser.objects.create_user(email='admin@admin.com', password='admin', role='admin', username='admin', name='Admin')
    zone = Zone.objects.create(name='ZonaTest', locality='Test')
    colony = Colony.objects.create(name='ColoniaTest', ubication='Calle 1', zone=zone, size=10)
    volunteer = CustomUser.objects.create_user(email='vol@vol.com', password='vol', role='voluntary', username='vol', name='Vol')
    Availability.objects.create(user=volunteer, day='monday', zone=zone)
    Assignment.objects.create(colony=colony, volunteer=volunteer, day='monday', frequency=3)

    client = APIClient()
    client.force_authenticate(user=admin)
    url = reverse('assignment-summary')
    response = client.get(url)
    assert response.status_code == 200
    assert isinstance(response.data, list)
    assert any('voluntarios_disponibles' in c for c in response.data)

@pytest.mark.django_db
def test_assignment_summary_volunteer():
    volunteer = CustomUser.objects.create_user(email='vol2@vol.com', password='vol', role='voluntary', username='vol2', name='Vol2')
    zone = Zone.objects.create(name='ZonaTest2', locality='Test2')
    colony = Colony.objects.create(name='ColoniaTest2', ubication='Calle 2', zone=zone, size=5)
    Availability.objects.create(user=volunteer, day='tuesday', zone=zone)
    Assignment.objects.create(colony=colony, volunteer=volunteer, day='tuesday', frequency=2)

    client = APIClient()
    client.force_authenticate(user=volunteer)
    url = reverse('assignment-summary')
    response = client.get(url)
    assert response.status_code == 200
    assert isinstance(response.data, list)
    assert all('voluntarios_disponibles' not in c for c in response.data)
    assert any(c['colonia'] == 'ColoniaTest2' for c in response.data)
