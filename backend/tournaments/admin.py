from django.contrib import admin
from .models import Tournament, Registration, TeamMember


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


class TeamMemberInline(admin.TabularInline):
    model = TeamMember
    extra = 1
    fields = ("name", "email", "is_captain")


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
    inlines = [TeamMemberInline]


# If I want team member to be editable in the admin, I can uncomment this code. But for now, I will keep it simple and not allow editing team members directly from the admin interface.
# @admin.register(TeamMember)
# class TeamMemberAdmin(admin.ModelAdmin):
#     list_display = ("name", "email", "registration", "is_captain")
#     list_filter = ("is_captain", "registration__tournament")
#     search_fields = ("name", "email", "registration__team_name")
