from django.urls import path

from .views import (
    UserRegisterView,
    UserLoginView,
    RecruiterRegisterView,
    RecruiterLoginView,
    ProfileView
)

urlpatterns = [

    path("user/register/", UserRegisterView.as_view()),

    path("user/login/", UserLoginView.as_view()),

    path("recruiter/register/", RecruiterRegisterView.as_view()),

    path("recruiter/login/", RecruiterLoginView.as_view()),

    path("profile/", ProfileView.as_view()),

]