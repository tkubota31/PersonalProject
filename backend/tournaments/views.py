from rest_framework import generics
from .models import Tournament, TeamRegistration
from .serializers import TournamentSerializer, TeamRegistrationSerializer

class TournamentListView(generics.ListAPIView):
    queryset = Tournament.objects.filter(is_open=True)
    serializer_class = TournamentSerializer

class TournamentDetailView(generics.RetrieveAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class TeamRegistrationCreateView(generics.CreateAPIView):
    serializer_class = TeamRegistrationSerializer


class TournamentRegistrationsView(generics.ListAPIView):
    serializer_class = TeamRegistrationSerializer

    def get_queryset(self):
        tournament_id = self.kwargs['tournament_id']
        return TeamRegistration.objects.filter(tournament_id=tournament_id, status='CONFIRMED')
