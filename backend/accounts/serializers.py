from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import LearningPath
User = get_user_model()


# User Registration Serializer

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "name",
            "email",
            "password",
        ]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )
        return value

    def create(self, validated_data):
        user = User(
            name=validated_data["name"],
            email=validated_data["email"],
            role="user",
        )

        user.set_password(validated_data["password"])
        user.save()

        return user


# Recruiter Registration Serializer

class RecruiterRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "name",
            "email",
            "password",
        ]
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )
        return value

    def create(self, validated_data):
        recruiter = User(
            name=validated_data["name"],
            email=validated_data["email"],
            role="recruiter",
        )

        recruiter.set_password(validated_data["password"])
        recruiter.save()

        return recruiter


# Profile Serializer

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "role",
            "gender",
            "experience",
            "education",
            "target_role",
            "career_goal",
            "skills",
            "resume",
            "resume_text",
            "parsed_resume",
            "phone",
            "location",
            "projects",
            "certifications",
            "years_of_experience",
            "linkedin",
            "github",
            "about",
            "company_name",
            "company_website",
            "company_description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = (
            "id",
            "email",
            "role",
            "created_at",
            "updated_at",
            "last_login",
            "is_staff",
            "is_superuser",
            "is_active",
            "date_joined",
            "resume",
            "resume_text",
            "parsed_resume",
        )

class LearningPathSerializer(serializers.ModelSerializer):

    class Meta:
        model = LearningPath
        fields = [
            "target_role",
            "career_goal",
            "roadmap",
            "recommendation",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "roadmap",
            "recommendation",
            "created_at",
            "updated_at",
        ]

class LearningPathGenerateSerializer(serializers.Serializer):

    target_role = serializers.CharField(
        max_length=100
    )

    career_goal = serializers.CharField()