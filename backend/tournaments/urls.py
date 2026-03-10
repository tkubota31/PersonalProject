from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    TournamentListView, TournamentDetailView, RegistrationCreateView,
    RegistrationDetailView, MyRegistrationsView,
    TournamentRegistrationsView, RegisterView, LoginView
)

urlpatterns = [
    # Auth endpoints
    path("auth/register/", RegisterView.as_view(), name='register'),
    path("auth/login/", LoginView.as_view(), name='login'),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name='token-refresh'),

    # Tournament endpoints
    path("tournaments/", TournamentListView.as_view(), name='tournament-list'),
    path("tournaments/<int:pk>/", TournamentDetailView.as_view(), name='tournament-detail'),
    path("tournaments/<int:tournament_id>/registrations/", TournamentRegistrationsView.as_view(), name='tournament-registrations'),

    # Registration endpoints
    path("registrations/", RegistrationCreateView.as_view(), name='registration-create'),
    path("registrations/<int:pk>/", RegistrationDetailView.as_view(), name='registration-detail'),
    path("registrations/my/", MyRegistrationsView.as_view(), name='my-registrations'),
]
