# users/urls.py

from django.urls import path
from .views import RegisterUserView, ListUserView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('', ListUserView.as_view() , name= 'users' )
]
