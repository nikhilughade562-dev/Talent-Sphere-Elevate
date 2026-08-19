from django.urls import path

from .views import (
    AddJobView,
    RecruiterJobsView,
    AllJobsView,
    ApplyToJobView,
    JobCandidatesView,
    UpdateApplicationStatusView,
    AppliedJobsView,
    RecruiterApplicationStatsView

)

urlpatterns = [

    path("", AllJobsView.as_view()),

    path("recruiter/jobs/", AddJobView.as_view()),

    path("recruiter/jobs/list/", RecruiterJobsView.as_view()),
    
    path("<int:job_id>/apply/", ApplyToJobView.as_view()),
    path("recruiter/jobs/<int:job_id>/candidates/", JobCandidatesView.as_view()),
    path("recruiter/applications/<int:app_id>/status/", UpdateApplicationStatusView.as_view()),
    path(
    "applied/",
    AppliedJobsView.as_view(),
    name="applied-jobs"
),
path(
    "recruiter/application-stats/",
    RecruiterApplicationStatsView.as_view(),
    name="recruiter-application-stats"
),
]