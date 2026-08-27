from django.urls import path

from .views import (
    UserRegisterView,
    UserLoginView,
    RecruiterRegisterView,
    RecruiterLoginView,
    ProfileView,
    ResumeUploadView,
    LearningPathView
)

urlpatterns = [

    path("user/register/", UserRegisterView.as_view()),

    path("user/login/", UserLoginView.as_view()),

    path("recruiter/register/", RecruiterRegisterView.as_view()),

    path("recruiter/login/", RecruiterLoginView.as_view()),

    path("profile/", ProfileView.as_view()),

    path("profile/resume/",ResumeUploadView.as_view(),name="resume-upload"),

    path("user/learning-path/",LearningPathView.as_view(),),


]