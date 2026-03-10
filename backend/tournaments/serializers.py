from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tournament, Registration, TeamMember


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password': "Passwords do not match."})
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({'username': "This username is already taken."})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': "This email is already in use."})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        fields = ['username', 'password']


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


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'email', 'is_captain']


class RegistrationSerializer(serializers.ModelSerializer):
    team_members = TeamMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Registration
        fields = '__all__'
        read_only_fields = ['created_at']


class RegistrationCreateSerializer(serializers.ModelSerializer):
    team_members = serializers.ListField(
        child=TeamMemberSerializer(),
        write_only=True,
        required=False,
        allow_empty=True
    )

    class Meta:
        model = Registration
        fields = ['tournament', 'team_name', 'captain_name', 'captain_email', 'captain_phone', 'notes', 'team_members']

    def validate_team_members(self, value):
        if not value:
            return value
        if len(value) > 10:
            raise serializers.ValidationError("Maximum 10 team members allowed.")

        captain_count = sum(1 for member in value if member.get('is_captain', False))
        if captain_count > 1:
            raise serializers.ValidationError("Only one team member can be marked as captain.")

        return value

    def create(self, validated_data):
        team_members_data = validated_data.pop('team_members', [])
        registration = Registration.objects.create(**validated_data)

        for member_data in team_members_data:
            TeamMember.objects.create(registration=registration, **member_data)

        return registration


class RegistrationUpdateSerializer(serializers.ModelSerializer):
    team_members = serializers.ListField(
        child=TeamMemberSerializer(),
        write_only=True,
        required=False,
        allow_empty=True
    )

    class Meta:
        model = Registration
        fields = ['team_name', 'captain_name', 'captain_email', 'captain_phone', 'notes', 'team_members']

    def validate_team_members(self, value):
        if not value:
            return value
        if len(value) > 10:
            raise serializers.ValidationError("Maximum 10 team members allowed.")

        captain_count = sum(1 for member in value if member.get('is_captain', False))
        if captain_count > 1:
            raise serializers.ValidationError("Only one team member can be marked as captain.")

        return value

    def update(self, instance, validated_data):
        team_members_data = validated_data.pop('team_members', None)

        # Update registration fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update team members if provided
        if team_members_data is not None:
            instance.team_members.all().delete()
            for member_data in team_members_data:
                TeamMember.objects.create(registration=instance, **member_data)

        return instance
