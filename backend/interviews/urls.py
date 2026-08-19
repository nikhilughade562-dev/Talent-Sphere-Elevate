from django.urls import path
from .views import (
    CreateInterviewView,
    RecruiterInterviewsView,
    CandidateInterviewsView,
    CancelInterviewView,
)

urlpatterns = [
    path("", CreateInterviewView.as_view(), name="create-interview"),
    path("recruiter/", RecruiterInterviewsView.as_view(), name="recruiter-interviews"),
    path("candidate/", CandidateInterviewsView.as_view(), name="candidate-interviews"),
    path("<int:pk>/cancel/", CancelInterviewView.as_view(), name="cancel-interview"),
]
