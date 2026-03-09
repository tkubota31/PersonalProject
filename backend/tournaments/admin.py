from django.contrib import admin
from .models import Tournament, Registration


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "date",
        "skill_level",
        "location",
        "max_teams",
        "is_open",
    )
    list_filter = ("is_open", "date", "skill_level")
    search_fields = ("name", "location")


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "team_name",
        "tournament",
        "captain_name",
        "captain_email",
        "status",
        "created_at",
    )
    list_filter = ("status", "created_at", "tournament")
    search_fields = ("team_name", "captain_name", "captain_email")
