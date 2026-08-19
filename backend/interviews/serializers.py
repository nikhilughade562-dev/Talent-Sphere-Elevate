from rest_framework import serializers
from .models import Interview
from accounts.models import User
from jobs.models import Job, Application

class InterviewSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(source="candidate.name", read_only=True)
    candidate_email = serializers.CharField(source="candidate.email", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)

    candidate_id = serializers.PrimaryKeyRelatedField(
        source="candidate", queryset=User.objects.filter(role="user")
    )
    recruiter_id = serializers.PrimaryKeyRelatedField(
        source="recruiter", read_only=True
    )
    application_id = serializers.PrimaryKeyRelatedField(
        source="application", queryset=Application.objects.all()
    )
    job_id = serializers.PrimaryKeyRelatedField(
        source="job", queryset=Job.objects.all()
    )

    class Meta:
        model = Interview
        fields = [
            "id",
            "candidate_id",
            "candidate_name",
            "candidate_email",
            "recruiter_id",
            "application_id",
            "job_id",
            "job_title",
            "scheduled_date",
            "scheduled_time",
            "meeting_link",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "status", "created_at", "updated_at"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Add camelCase mappings for approximately exact structure
        data["candidateId"] = data["candidate_id"]
        data["recruiterId"] = data["recruiter_id"]
        data["applicationId"] = data["application_id"]
        data["jobId"] = data["job_id"]
        data["scheduledDate"] = data["scheduled_date"]
        data["scheduledTime"] = data["scheduled_time"]
        data["meetingLink"] = data["meeting_link"]
        data["createdAt"] = data["created_at"]
        data["updatedAt"] = data["updated_at"]
        return data

    def to_internal_value(self, data):
        # Map camelCase inputs to snake_case if present
        internal_data = data.copy()
        if "candidateId" in internal_data:
            internal_data["candidate_id"] = internal_data.pop("candidateId")
        if "applicationId" in internal_data:
            internal_data["application_id"] = internal_data.pop("applicationId")
        if "jobId" in internal_data:
            internal_data["job_id"] = internal_data.pop("jobId")
        if "scheduledDate" in internal_data:
            internal_data["scheduled_date"] = internal_data.pop("scheduledDate")
        if "scheduledTime" in internal_data:
            internal_data["scheduled_time"] = internal_data.pop("scheduledTime")
        if "meetingLink" in internal_data:
            internal_data["meeting_link"] = internal_data.pop("meetingLink")
        return super().to_internal_value(internal_data)
