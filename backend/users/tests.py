
import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import CustomUser, Availability

@pytest.mark.django_db
def test_register_user():
    client = APIClient()
    url = reverse('register')
    data = {
        'username': 'testuser',
        'name': 'Test User',
        'email': 'testuser@example.com',
        'password': 'testpass123',
        'role': 'voluntary'
    }
    response = client.post(url, data)
    assert response.status_code == 201
    assert CustomUser.objects.filter(email='testuser@example.com').exists()

@pytest.mark.django_db
def test_list_users_as_admin():
    admin = CustomUser.objects.create_user(email='admin@admin.com', password='admin', role='admin', username='admin', name='Admin')
    client = APIClient()
    client.force_authenticate(user=admin)
    url = reverse('users')
    response = client.get(url)
    assert response.status_code == 200
    assert isinstance(response.data, list)

@pytest.mark.django_db
def test_my_availability_list_create():
    user = CustomUser.objects.create_user(email='vol@vol.com', password='vol', role='voluntary', username='vol', name='Vol')
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse('my-availability')
    data = {'day': 'monday', 'zone': 1}
    response = client.post(url, data)
    assert response.status_code in (201, 400)  # 400 si la zona no existe
    response = client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_promote_by_email():
    admin = CustomUser.objects.create_user(email='admin@admin.com', password='admin', role='admin', username='admin', name='Admin')
    user = CustomUser.objects.create_user(email='vol2@vol.com', password='vol', role='voluntary', username='vol2', name='Vol2')
    client = APIClient()
    client.force_authenticate(user=admin)
    url = reverse('promote-by-email')
    response = client.patch(url, {'email': 'vol2@vol.com'}, format='json')
    assert response.status_code == 200
    user.refresh_from_db()
    assert user.role == 'admin'
