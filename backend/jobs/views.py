from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Job
from .serializers import JobSerializer


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