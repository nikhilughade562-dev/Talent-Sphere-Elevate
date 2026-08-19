from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Interview
from .serializers import InterviewSerializer
from jobs.models import Application

class CreateInterviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "recruiter":
            return Response(
                {"error": "Only recruiters can schedule interviews."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = InterviewSerializer(data=request.data)
        if serializer.is_valid():
            # Validate that the application belongs to a job posted by this recruiter
            app = serializer.validated_data.get("application")
            if app.job.recruiter != request.user:
                return Response(
                    {"error": "You can only schedule interviews for applications to your own jobs."},
                    status=status.HTTP_403_FORBIDDEN
                )

            interview = serializer.save(recruiter=request.user)
            
            # Automatically update the Application status to 'interview'
            app.status = "interview"
            app.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecruiterInterviewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "recruiter":
            return Response(
                {"error": "Only recruiters can view their scheduled interviews."},
                status=status.HTTP_403_FORBIDDEN
            )

        interviews = Interview.objects.filter(recruiter=request.user).order_by("scheduled_date", "scheduled_time")
        serializer = InterviewSerializer(interviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CandidateInterviewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "user":
            return Response(
                {"error": "Only candidates can view their interviews."},
                status=status.HTTP_403_FORBIDDEN
            )

        interviews = Interview.objects.filter(candidate=request.user).order_by("scheduled_date", "scheduled_time")
        serializer = InterviewSerializer(interviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CancelInterviewView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        if request.user.role != "recruiter":
            return Response(
                {"error": "Only recruiters can cancel interviews."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            interview = Interview.objects.get(id=pk, recruiter=request.user)
        except Interview.DoesNotExist:
            return Response(
                {"error": "Interview not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        interview.status = "cancelled"
        interview.save()
        
        serializer = InterviewSerializer(interview)
        return Response(serializer.data, status=status.HTTP_200_OK)
