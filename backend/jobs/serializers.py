from rest_framework import serializers
from .models import Job, Application


class JobSerializer(serializers.ModelSerializer):

    recruiter_name = serializers.CharField(
        source="recruiter.name",
        read_only=True
    )

    class Meta:
        model = Job
        fields = "__all__"
        read_only_fields = (
            "id",
            "recruiter",
            "created_at",
            "updated_at",
        )

class ApplicationSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(
        source="candidate.name",
        read_only=True
    )

    candidate_email = serializers.CharField(
        source="candidate.email",
        read_only=True
    )

    candidate_skills = serializers.JSONField(
        source="candidate.skills",
        read_only=True
    )

    candidate_experience = serializers.FloatField(
        source="candidate.years_of_experience",
        read_only=True
    )

    class Meta:
        model = Application
        fields = "__all__"


class AppliedJobSerializer(serializers.ModelSerializer):

    job = JobSerializer(read_only=True)

    class Meta:
        model = Application

        fields = [
            "id",
            "job",
            "status",
            "applied_at",
            "overall_score",
            "skill_score",
            "experience_score",
            "project_score",
            "matched_skills",
            "missing_skills",
        ]