from rest_framework import serializers
from .models import Tournament, Registration


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'
        read_only_fields = ['created_at', 'created_by']


class TournamentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['name', 'description', 'location', 'date', 'skill_level', 'max_teams', 'registration_deadline', 'fee', 'is_open']


class TournamentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['name', 'description', 'location', 'date', 'skill_level', 'max_teams', 'registration_deadline', 'fee', 'is_open']


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'
        read_only_fields = ['created_at']


class RegistrationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['tournament', 'team_name', 'captain_name', 'captain_email', 'captain_phone', 'notes']
