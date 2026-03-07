from django.urls import path
from .views import TournamentListView, TournamentDetailView, TeamRegistrationCreateView, TournamentRegistrationsView

urlpatterns = [
    path("tournaments/", TournamentListView.as_view()),
    path("tournaments/<uuid:pk>/", TournamentDetailView.as_view()),
    path("tournaments/<uuid:tournament_id>/registrations/", TournamentRegistrationsView.as_view()),
    path("registrations/", TeamRegistrationCreateView.as_view()),
]
