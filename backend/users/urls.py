# users/urls.py

from django.urls import path
from .views import RegisterUserView, ListUserView, RetrieveUserView, UpdateUserView, DeleteUserView, PromoteByEmailView, MyAvailabilityListCreateView, AllAvailabilityListView, AvailabilityDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('', ListUserView.as_view() , name= 'users' ),
    path('<int:id>/', RetrieveUserView.as_view(), name='get_user'),  # <-- detalle por ID
    path('<int:id>/update/', UpdateUserView.as_view(), name='update_user'),  
    path('<int:id>/delete/', DeleteUserView.as_view(), name='delete_user'), # <-- delete por ID
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('promote/', PromoteByEmailView.as_view(), name='promote-by-email'),
    path('availability/', MyAvailabilityListCreateView.as_view(), name='my-availability'),
    path('availability/all/', AllAvailabilityListView.as_view(), name='all-availability'),
    path('availability/<int:pk>/', AvailabilityDetailView.as_view(), name='availability-detail'),
]
