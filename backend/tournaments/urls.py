from django.urls import path
from .views import TournamentListView, TournamentDetailView, TeamRegistrationCreateView

urlpatterns = [
    path("tournaments/", TournamentListView.as_view()),
    path("tournaments/<uuid:pk>/", TournamentDetailView.as_view()),
    path("registrations/", TeamRegistrationCreateView.as_view()),
]
