from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from .models import Tournament, Registration
from .serializers import (
    TournamentSerializer, TournamentCreateSerializer, TournamentUpdateSerializer,
    RegistrationSerializer, RegistrationCreateSerializer
)


class TournamentListView(generics.ListCreateAPIView):
    queryset = Tournament.objects.filter(is_open=True)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TournamentCreateSerializer
        return TournamentSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user if self.request.user.is_authenticated else None)


class TournamentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return TournamentUpdateSerializer
        return TournamentSerializer


class RegistrationCreateView(generics.CreateAPIView):
    serializer_class = RegistrationCreateSerializer

    def perform_create(self, serializer):
        serializer.save()


class TournamentRegistrationsView(generics.ListAPIView):
    serializer_class = RegistrationSerializer

    def get_queryset(self):
        tournament_id = self.kwargs['tournament_id']
        return Registration.objects.filter(tournament_id=tournament_id, status='confirmed')
