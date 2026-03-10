from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Tournament, Registration, TeamMember
from django.utils import timezone
from datetime import timedelta


class TeamMemberRegistrationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

        # Create tournament
        self.tournament = Tournament.objects.create(
            name='Test Tournament',
            location='Test Location',
            date='2026-04-01',
            skill_level='C',
            max_teams=10,
            registration_deadline=timezone.now() + timedelta(days=30),
            fee=50.00,
            created_by=self.user
        )

    def test_create_registration_with_team_members(self):
        """Test creating a registration with team members"""
        data = {
            'tournament': self.tournament.id,
            'team_name': 'Test Team',
            'captain_name': 'Captain Name',
            'captain_email': 'captain@example.com',
            'captain_phone': '1234567890',
            'team_members': [
                {'name': 'Player 1', 'email': 'player1@example.com', 'is_captain': False},
                {'name': 'Player 2', 'email': 'player2@example.com', 'is_captain': True},
            ]
        }

        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/registrations/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Registration.objects.count(), 1)

        registration = Registration.objects.first()
        self.assertEqual(registration.user, self.user)
        self.assertEqual(registration.team_members.count(), 2)

        # Check team members
        captain_member = registration.team_members.filter(is_captain=True).first()
        self.assertIsNotNone(captain_member)
        self.assertEqual(captain_member.name, 'Player 2')

    def test_team_members_max_validation(self):
        """Test that max 10 team members is enforced"""
        data = {
            'tournament': self.tournament.id,
            'team_name': 'Test Team',
            'captain_name': 'Captain Name',
            'captain_email': 'captain@example.com',
            'captain_phone': '1234567890',
            'team_members': [
                {'name': f'Player {i}', 'email': f'player{i}@example.com', 'is_captain': False}
                for i in range(11)
            ]
        }

        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/registrations/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('team_members', response.data)

    def test_single_captain_validation(self):
        """Test that only one team member can be marked as captain"""
        data = {
            'tournament': self.tournament.id,
            'team_name': 'Test Team',
            'captain_name': 'Captain Name',
            'captain_email': 'captain@example.com',
            'captain_phone': '1234567890',
            'team_members': [
                {'name': 'Player 1', 'email': 'player1@example.com', 'is_captain': True},
                {'name': 'Player 2', 'email': 'player2@example.com', 'is_captain': True},
            ]
        }

        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/registrations/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('team_members', response.data)

    def test_get_registration_detail(self):
        """Test retrieving registration with team members"""
        # Create registration with team members
        registration = Registration.objects.create(
            tournament=self.tournament,
            user=self.user,
            team_name='Test Team',
            captain_name='Captain Name',
            captain_email='captain@example.com',
            captain_phone='1234567890'
        )

        TeamMember.objects.create(
            registration=registration,
            name='Player 1',
            email='player1@example.com',
            is_captain=False
        )

        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/api/registrations/{registration.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['team_members']), 1)
        self.assertEqual(response.data['team_members'][0]['name'], 'Player 1')

    def test_update_registration_team_members(self):
        """Test updating team members on existing registration"""
        # Create registration
        registration = Registration.objects.create(
            tournament=self.tournament,
            user=self.user,
            team_name='Test Team',
            captain_name='Captain Name',
            captain_email='captain@example.com',
            captain_phone='1234567890'
        )

        TeamMember.objects.create(
            registration=registration,
            name='Player 1',
            email='player1@example.com',
            is_captain=False
        )

        # Update with new members
        data = {
            'team_members': [
                {'name': 'New Player 1', 'email': 'newplayer1@example.com', 'is_captain': False},
                {'name': 'New Player 2', 'email': 'newplayer2@example.com', 'is_captain': True},
            ]
        }

        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'/api/registrations/{registration.id}/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify members were replaced
        registration.refresh_from_db()
        self.assertEqual(registration.team_members.count(), 2)
        self.assertTrue(registration.team_members.filter(is_captain=True).exists())

    def test_registration_owner_only_can_update(self):
        """Test that only registration owner can update"""
        # Create another user
        other_user = User.objects.create_user(
            username='otheruser',
            email='other@example.com',
            password='testpass123'
        )

        # Create registration as first user
        registration = Registration.objects.create(
            tournament=self.tournament,
            user=self.user,
            team_name='Test Team',
            captain_name='Captain Name',
            captain_email='captain@example.com',
            captain_phone='1234567890'
        )

        # Try to update as different user
        data = {'team_name': 'Updated Team'}

        self.client.force_authenticate(user=other_user)
        response = self.client.patch(f'/api/registrations/{registration.id}/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_my_registrations_view(self):
        """Test listing user's own registrations"""
        # Create registration as test user
        Registration.objects.create(
            tournament=self.tournament,
            user=self.user,
            team_name='Test Team',
            captain_name='Captain Name',
            captain_email='captain@example.com',
            captain_phone='1234567890'
        )

        # Create registration as different user
        other_user = User.objects.create_user(
            username='otheruser',
            email='other@example.com',
            password='testpass123'
        )

        Registration.objects.create(
            tournament=self.tournament,
            user=other_user,
            team_name='Other Team',
            captain_name='Other Captain',
            captain_email='othercaptain@example.com',
            captain_phone='0987654321'
        )

        # Get my registrations
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/registrations/my/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['team_name'], 'Test Team')

    def test_my_registrations_filtered_by_tournament(self):
        """Test my registrations filtered by tournament"""
        # Create second tournament
        tournament2 = Tournament.objects.create(
            name='Test Tournament 2',
            location='Test Location 2',
            date='2026-05-01',
            skill_level='B',
            max_teams=10,
            registration_deadline=timezone.now() + timedelta(days=30),
            fee=100.00,
            created_by=self.user
        )

        # Create registrations for both tournaments
        Registration.objects.create(
            tournament=self.tournament,
            user=self.user,
            team_name='Test Team 1',
            captain_name='Captain Name',
            captain_email='captain@example.com',
            captain_phone='1234567890'
        )

        Registration.objects.create(
            tournament=tournament2,
            user=self.user,
            team_name='Test Team 2',
            captain_name='Captain Name',
            captain_email='captain@example.com',
            captain_phone='1234567890'
        )

        # Get my registrations for first tournament
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/api/registrations/my/?tournament={self.tournament.id}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['team_name'], 'Test Team 1')
