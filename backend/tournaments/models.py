from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Tournament(models.Model):
    SKILL_LEVELS = [
        ("C-", "C-"),
        ("C", "C"),
        ("C+", "C+"),
        ("B-", "B-"),
        ("B", "B"),
        ("B+", "B+"),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=200)
    date = models.DateField()
    skill_level = models.CharField(max_length=2, choices=SKILL_LEVELS, default="C")
    max_teams = models.PositiveIntegerField()
    registration_deadline = models.DateTimeField()
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    is_open = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Registration(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
    ]

    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name="registrations")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    team_name = models.CharField(max_length=100)
    captain_name = models.CharField(max_length=100)
    captain_email = models.EmailField()
    captain_phone = models.CharField(max_length=20)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.team_name} - {self.tournament.name}"


class TeamMember(models.Model):
    registration = models.ForeignKey(Registration, on_delete=models.CASCADE, related_name="team_members")
    name = models.CharField(max_length=100)
    email = models.EmailField()
    is_captain = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.registration.team_name})"
