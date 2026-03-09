from django.urls import path
from .views import TournamentListView, TournamentDetailView, RegistrationCreateView, TournamentRegistrationsView

urlpatterns = [
    path("tournaments/", TournamentListView.as_view(), name='tournament-list'),
    path("tournaments/<int:pk>/", TournamentDetailView.as_view(), name='tournament-detail'),
    path("tournaments/<int:tournament_id>/registrations/", TournamentRegistrationsView.as_view(), name='tournament-registrations'),
    path("registrations/", RegistrationCreateView.as_view(), name='registration-create'),
]
