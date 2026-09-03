from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from .models import Job, Application
from .serializers import JobSerializer,ApplicationSerializer,AppliedJobSerializer
from rest_framework import serializers
from django.db.models import Count

from .matcher import calculate_match

class ApplicationSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(source='candidate.name', read_only=True)
    candidate_email = serializers.CharField(source='candidate.email', read_only=True)
    candidate_skills = serializers.JSONField(source='candidate.skills', read_only=True)
    candidate_experience = serializers.FloatField(source='candidate.years_of_experience', read_only=True)
    
    class Meta:
        model = Application
        fields = "__all__"

class RecommendedJobsView(APIView):
    """Return the best active jobs for the logged-in candidate.

    The recommendation engine reuses ``calculate_match`` so the score shown
    here is consistent with the score calculated when the candidate applies.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "user":
            return Response(
                {"error": "Only candidates can view job recommendations."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            limit = int(request.query_params.get("limit", 5))
        except (TypeError, ValueError):
            limit = 5

        # Keep the endpoint predictable and prevent an unnecessarily large query.
        limit = max(1, min(limit, 20))

        applied_job_ids = Application.objects.filter(
            candidate=request.user
        ).values_list("job_id", flat=True)

        active_jobs = (
            Job.objects
            .filter(status="active")
            .exclude(id__in=applied_job_ids)
        )

        recommendations = []
        for job in active_jobs:
            match = calculate_match(request.user, job)
            score = match["overall_score"]

            if score >= 80:
                level = "Excellent Match"
            elif score >= 60:
                level = "Strong Match"
            elif score >= 40:
                level = "Good Match"
            else:
                level = "Low Match"

            recommendations.append({
                "job_id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "description": job.description,
                "experience_level": job.experience_level,
                "salary_min": job.salary_min,
                "salary_max": job.salary_max,
                "required_skills": job.requirements,
                "overall_score": score,
                "skill_score": match["skill_score"],
                "experience_score": match["experience_score"],
                "project_score": match["project_score"],
                "matched_skills": match["matched_skills"],
                "missing_skills": match["missing_skills"],
                "recommendation_level": level,
            })

        recommendations.sort(
            key=lambda item: (
                item["overall_score"],
                item["skill_score"],
                item["experience_score"],
            ),
            reverse=True,
        )

        results = recommendations[:limit]

        return Response(
            {
                "count": len(results),
                "total_active_jobs": len(recommendations),
                "results": results,
            },
            status=status.HTTP_200_OK,
        )


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
        
        return Response(
            {
                "message": "Successfully applied",
                "application_id": application.id,

                "match_score": match_data["overall_score"],
                "skill_score": match_data["skill_score"],
                "experience_score": match_data["experience_score"],
                "project_score": match_data["project_score"],

                "matched_skills": match_data["matched_skills"],
                "missing_skills": match_data["missing_skills"],
            },
            status=status.HTTP_201_CREATED
        )

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

class AppliedJobsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "user":
            return Response(
                {
                    "error": "Only candidates can view applied jobs."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        applications = (
            Application.objects
            .filter(candidate=request.user)
            .select_related("job")
            .order_by("-applied_at")
        )

        serializer = AppliedJobSerializer(
            applications,
            many=True
        )

        return Response(
            {
                "count": applications.count(),
                "applications": serializer.data
            },
            status=status.HTTP_200_OK
        )




class RecruiterApplicationStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "recruiter":
            return Response(
                {"error": "Only recruiters can view application stats."},
                status=status.HTTP_403_FORBIDDEN
            )

        total_applications = Application.objects.filter(
            job__recruiter=request.user
        ).count()

        selected_applications = Application.objects.filter(
            job__recruiter=request.user,
            status="shortlisted"
        ).count()

        return Response(
            {
                "total_applications": total_applications,
                "selected_applications": selected_applications
            },
            status=status.HTTP_200_OK
        )