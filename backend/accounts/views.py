from django.contrib.auth import get_user_model, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    UserRegisterSerializer,
    RecruiterRegisterSerializer,
    ProfileSerializer,
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
    