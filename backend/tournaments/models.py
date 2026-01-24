import uuid
from django.db import models


class Tournament(models.Model):
    SKILL_LEVELS = [
        ("C-", "C-"),
        ("C", "C"),
        ("C+", "C+"),
        ("B-", "B-"),
        ("B", "B"),
        ("B+", "B+"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    date = models.DateField()
    location = models.CharField(max_length=200)
    skill_level = models.CharField(
        max_length=2,
        choices=SKILL_LEVELS,
    )
    max_teams = models.PositiveIntegerField()
    registration_deadline = models.DateTimeField()
    is_open = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.skill_level})"


class TeamRegistration(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("CONFIRMED", "Confirmed"),
        ("WAITLIST", "Waitlist"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tournament = models.ForeignKey(
        Tournament,
        related_name="registrations",
        on_delete=models.CASCADE,
    )
    team_name = models.CharField(max_length=100)
    captain_name = models.CharField(max_length=100)
    captain_email = models.EmailField()
    captain_phone = models.CharField(max_length=20)
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.team_name} - {self.tournament.name}"
