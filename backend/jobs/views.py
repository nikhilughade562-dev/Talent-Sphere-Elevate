from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Job, Application
from .serializers import JobSerializer
from rest_framework import serializers

class ApplicationSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(source='candidate.name', read_only=True)
    candidate_email = serializers.CharField(source='candidate.email', read_only=True)
    candidate_skills = serializers.JSONField(source='candidate.skills', read_only=True)
    candidate_experience = serializers.FloatField(source='candidate.years_of_experience', read_only=True)
    
    class Meta:
        model = Application
        fields = "__all__"


class AddJobView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        if request.user.role != "recruiter":
            return Response(
                {"error": "Only recruiters can add jobs."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = JobSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(recruiter=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=400)


class RecruiterJobsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        jobs = Job.objects.filter(recruiter=request.user)

        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)


class AllJobsView(APIView):

    def get(self, request):

        jobs = Job.objects.filter(status="active")

        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)

from .matcher import calculate_match

class ApplyToJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        if request.user.role != "user":
            return Response({"error": "Only candidates can apply."}, status=status.HTTP_403_FORBIDDEN)
            
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if Application.objects.filter(job=job, candidate=request.user).exists():
            return Response({"error": "Already applied."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Calculate Match
        match_data = calculate_match(request.user, job)
        
        application = Application.objects.create(
            job=job,
            candidate=request.user,
            overall_score=match_data["overall_score"],
            skill_score=match_data["skill_score"],
            experience_score=match_data["experience_score"],
            project_score=match_data["project_score"],
            matched_skills=match_data["matched_skills"],
            missing_skills=match_data["missing_skills"]
        )
        
        return Response({"message": "Successfully applied", "match_score": match_data["overall_score"]}, status=status.HTTP_201_CREATED)

class JobCandidatesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
        if request.user.role != "recruiter":
            return Response({"error": "Only recruiters can view candidates."}, status=status.HTTP_403_FORBIDDEN)
            
        try:
            job = Job.objects.get(id=job_id, recruiter=request.user)
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)
            
        applications = Application.objects.filter(job=job).order_by('-overall_score')
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)
        
class UpdateApplicationStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, app_id):
        if request.user.role != "recruiter":
            return Response({"error": "Only recruiters can update status."}, status=status.HTTP_403_FORBIDDEN)
            
        try:
            application = Application.objects.get(id=app_id, job__recruiter=request.user)
        except Application.DoesNotExist:
            return Response({"error": "Application not found."}, status=status.HTTP_404_NOT_FOUND)
            
        new_status = request.data.get("status")
        if new_status in dict(Application.STATUS_CHOICES).keys():
            application.status = new_status
            application.save()
            return Response({"message": "Status updated."})
            
        return Response({"error": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)