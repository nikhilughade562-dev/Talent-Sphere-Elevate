from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from .models import Job, Application

User = get_user_model()


class RecommendedJobsViewTests(APITestCase):
    def setUp(self):
        self.candidate = User.objects.create_user(
            email="candidate@example.com",
            name="Test Candidate",
            password="TestPass123!",
            role="user",
            skills=["Python", "Django", "SQL"],
            years_of_experience=1,
            projects=["Built a Django REST API using Python and SQL."],
            resume_text="Python Django SQL REST API backend developer",
        )
        self.recruiter = User.objects.create_user(
            email="recruiter@example.com",
            name="Test Recruiter",
            password="TestPass123!",
            role="recruiter",
        )

        self.backend_job = Job.objects.create(
            title="Backend Developer",
            company="Demo Tech",
            location="Hyderabad",
            description="Backend development with Python and Django.",
            requirements=["Python", "Django", "SQL"],
            experience_level="junior",
            salary_min=500000,
            salary_max=900000,
            status="active",
            recruiter=self.recruiter,
        )
        self.frontend_job = Job.objects.create(
            title="Frontend Developer",
            company="Demo Tech",
            location="Hyderabad",
            description="Frontend development with React and CSS.",
            requirements=["React", "CSS", "JavaScript"],
            experience_level="junior",
            salary_min=500000,
            salary_max=900000,
            status="active",
            recruiter=self.recruiter,
        )
        self.closed_job = Job.objects.create(
            title="Closed Backend Role",
            company="Demo Tech",
            location="Hyderabad",
            description="Closed position.",
            requirements=["Python"],
            experience_level="junior",
            salary_min=500000,
            salary_max=900000,
            status="closed",
            recruiter=self.recruiter,
        )

        token = AccessToken.for_user(self.candidate)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_recommendations_are_ranked_and_closed_jobs_are_excluded(self):
        response = self.client.get("/api/jobs/recommended/")

        self.assertEqual(response.status_code, 200)
        results = response.data["results"]
        self.assertGreaterEqual(len(results), 2)
        self.assertEqual(results[0]["job_id"], self.backend_job.id)
        self.assertNotIn(self.closed_job.id, [item["job_id"] for item in results])
        self.assertGreater(results[0]["overall_score"], results[1]["overall_score"])
        self.assertIn("Python", results[0]["matched_skills"])

    def test_already_applied_job_is_excluded(self):
        Application.objects.create(
            job=self.backend_job,
            candidate=self.candidate,
        )

        response = self.client.get("/api/jobs/recommended/")

        self.assertEqual(response.status_code, 200)
        self.assertNotIn(
            self.backend_job.id,
            [item["job_id"] for item in response.data["results"]],
        )

    def test_recruiters_cannot_use_candidate_recommendation_endpoint(self):
        token = AccessToken.for_user(self.recruiter)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = self.client.get("/api/jobs/recommended/")

        self.assertEqual(response.status_code, 403)
