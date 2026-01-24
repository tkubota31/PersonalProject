from django.contrib import admin
from .models import Tournament, TeamRegistration


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "date",
        "skill_level",
        "is_open",
        "max_teams",
    )
    list_filter = ("skill_level", "is_open")
    search_fields = ("name", "location")


@admin.register(TeamRegistration)
class TeamRegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "team_name",
        "tournament",
        "status",
        "captain_email",
        "created_at",
    )
    list_filter = ("status", "tournament")
    search_fields = ("team_name", "captain_email")
