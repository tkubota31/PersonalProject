from rest_framework import serializers
from .models import Tournament, TeamRegistration

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = "__all__"


class TeamRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamRegistration
        fields = "__all__"
        read_only_fields = ("status", "created_at")
