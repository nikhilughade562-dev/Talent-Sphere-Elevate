from django.urls import path

from .views import (
    AddJobView,
    RecruiterJobsView,
    AllJobsView,
)

urlpatterns = [

    path("", AllJobsView.as_view()),

    path("recruiter/jobs/", AddJobView.as_view()),

    path("recruiter/jobs/list/", RecruiterJobsView.as_view()),

]