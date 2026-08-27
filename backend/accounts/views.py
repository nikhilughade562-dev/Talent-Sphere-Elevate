from django.contrib.auth import get_user_model, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .resume_parser import parse_resume
from .models import LearningPath
from .llm_service import generate_learning_path

from .serializers import (
    UserRegisterSerializer,
    RecruiterRegisterSerializer,
    ProfileSerializer,
    LearningPathSerializer,
    LearningPathGenerateSerializer,
)

User = get_user_model()


def get_tokens(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


# --------------------------------
# User Register
# --------------------------------

class UserRegisterView(APIView):

    def post(self, request):

        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            tokens = get_tokens(user)

            return Response({
                "message": "User Registered Successfully",
                "access": tokens["access"],
                "refresh": tokens["refresh"],
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=400)


# --------------------------------
# Recruiter Register
# --------------------------------

class RecruiterRegisterView(APIView):

    def post(self, request):

        serializer = RecruiterRegisterSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            tokens = get_tokens(user)

            return Response({
                "message": "User Registered Successfully",
                "access": tokens["access"],
                "refresh": tokens["refresh"],
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=400)


# --------------------------------
# User Login
# --------------------------------

class UserLoginView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)

        if user is None or user.role != "user":
            return Response(
                {"error": "Invalid Credentials"},
                status=401
            )

        tokens = get_tokens(user)

        return Response({

            "message": "Login Successful",
            "access": tokens["access"],
            "refresh": tokens["refresh"],


        })


# --------------------------------
# Recruiter Login
# --------------------------------

class RecruiterLoginView(APIView):

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        recruiter = authenticate(email=email, password=password)

        if recruiter is None or recruiter.role != "recruiter":
            return Response(
                {"error": "Invalid Credentials"},
                status=401
            )

        tokens = get_tokens(recruiter)

        return Response({

            "message": "Login Successful",
            "access": tokens["access"],
            "refresh": tokens["refresh"],

        })

class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = ProfileSerializer(request.user)

        return Response(serializer.data)

    def put(self, request):

        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response({
                "message": "Profile Updated Successfully",
                "user": serializer.data
            })

        return Response(serializer.errors, status=400)


class ResumeUploadView(APIView):

    permission_classes = [IsAuthenticated]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def post(self, request):

        # Only candidates/users can upload resumes
        if request.user.role != "user":
            return Response(
                {
                    "error": "Only candidates can upload resumes."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        resume_file = request.FILES.get("resume")

        # Check file exists
        if not resume_file:

            return Response(
                {
                    "error": "Please upload a resume."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if resume_file.size > 5 * 1024 * 1024:

            return Response(
                {
                    "error": "Resume size must be less than 5MB."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        allowed_extensions = [
            ".pdf",
            ".docx",
            ".txt"
        ]

        file_name = resume_file.name.lower()

        if not any(
            file_name.endswith(extension)
            for extension in allowed_extensions
        ):

            return Response(
                {
                    "error": "Only PDF, DOCX and TXT files are allowed."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        parsed_data = parse_resume(resume_file)

        if not parsed_data["success"]:

            return Response(
                {
                    "error": "Could not extract text from the resume."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = request.user

        user.resume = resume_file

        # Limit stored text
        user.resume_text = parsed_data["text"][:10000]

        # Save parsed information
        user.parsed_resume = {
            "success": True,
            "skills": parsed_data["skills"],
            "email": parsed_data.get("email"),
            "phone": parsed_data.get("phone"),
            "location": parsed_data.get("location"),
            "years_of_experience": parsed_data.get("years_of_experience")
        }

        # Save skills as JSON array
        user.skills = parsed_data["skills"]
        
        if parsed_data.get("phone") and not user.phone:
            user.phone = parsed_data["phone"]
        if parsed_data.get("location") and not user.location:
            user.location = parsed_data["location"]
        if parsed_data.get("years_of_experience") is not None and not user.years_of_experience:
            user.years_of_experience = parsed_data["years_of_experience"]
            
        user.save()

        return Response(
            {
                "success": True,

                "message": "Resume uploaded and parsed successfully.",

                "skills": parsed_data["skills"],

                "resume_text": parsed_data["text"][:10000],

                "resume": user.resume.url if user.resume else None
            },
            status=status.HTTP_200_OK
        )

class LearningPathView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:
            learning_path = LearningPath.objects.get(
                user=request.user
            )

        except LearningPath.DoesNotExist:
            return Response({
                "exists": False
            })

        serializer = LearningPathSerializer(
            learning_path
        )

        return Response({
            "exists": True,
            "learning_path": serializer.data
        })

    def post(self, request):
        if request.user.role != "user":
            return Response(
                {"error": "Only candidates can access learning paths."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = LearningPathGenerateSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        target_role = serializer.validated_data["target_role"]
        career_goal = serializer.validated_data["career_goal"]

        user = request.user

        result = generate_learning_path(
            skills=user.skills,
            experience=user.experience,
            education=user.education,
            target_role=target_role,
            career_goal=career_goal
        )

        learning_path, created = LearningPath.objects.update_or_create(
            user=user,
            defaults={
                "target_role": target_role,
                "career_goal": career_goal,
                "roadmap": result["roadmap"],
                "recommendation": result["recommendation"],
            }
        )

        response_serializer = LearningPathSerializer(
            learning_path
        )

        return Response({
            "message": (
                "Learning path generated successfully."
                if created
                else "Learning path updated successfully."
            ),
            "learning_path": response_serializer.data
        })