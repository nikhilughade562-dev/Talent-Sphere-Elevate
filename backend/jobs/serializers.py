from rest_framework import serializers
from .models import Job


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