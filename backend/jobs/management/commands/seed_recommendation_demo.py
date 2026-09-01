from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from jobs.models import Job, Application

User = get_user_model()


class Command(BaseCommand):
    help = "Create demo candidate/recruiter accounts and jobs for testing AI recommendations."

    def handle(self, *args, **options):
        recruiter, created = User.objects.get_or_create(
            email="demo.recruiter@talentsphere.local",
            defaults={
                "name": "Demo Recruiter",
                "role": "recruiter",
            },
        )
        if created:
            recruiter.set_password("Demo@12345")
            recruiter.save()

        candidate, created = User.objects.get_or_create(
            email="demo.candidate@talentsphere.local",
            defaults={
                "name": "Sharanya Reddy",
                "role": "user",
                "skills": [
                    "Python",
                    "Django",
                    "Flask",
                    "SQL",
                    "MySQL",
                    "PostgreSQL",
                    "MongoDB",
                    "REST API",
                    "Docker",
                    "AWS",
                    "Git",
                    "GitHub",
                    "Linux",
                ],
                "years_of_experience": 1,
                "projects": [
                    "Built a Django REST API using Python, SQL and MySQL.",
                    "Containerized backend services with Docker.",
                ],
                "resume_text": (
                    "Backend Developer Python Django Flask SQL MySQL PostgreSQL "
                    "MongoDB REST API Docker AWS Git GitHub Linux"
                ),
            },
        )
        if created:
            candidate.set_password("Demo@12345")
            candidate.save()

        demo_jobs = [
            {
                "title": "Backend Developer",
                "company": "Talent Tech Solutions",
                "location": "Hyderabad, India",
                "description": "Build backend APIs and services using Python and Django.",
                "requirements": ["Python", "Django", "SQL", "REST API", "Docker"],
                "experience_level": "junior",
                "salary_min": 500000,
                "salary_max": 900000,
            },
            {
                "title": "Data Analyst",
                "company": "Talent Tech Solutions",
                "location": "Hyderabad, India",
                "description": "Analyze business data using Python and SQL.",
                "requirements": ["Python", "SQL", "Pandas", "Power BI"],
                "experience_level": "junior",
                "salary_min": 450000,
                "salary_max": 800000,
            },
            {
                "title": "Frontend Developer",
                "company": "Talent Tech Solutions",
                "location": "Bangalore, India",
                "description": "Build responsive web interfaces using React and CSS.",
                "requirements": ["React", "CSS", "JavaScript"],
                "experience_level": "junior",
                "salary_min": 450000,
                "salary_max": 850000,
            },
            {
                "title": "Closed Backend Position",
                "company": "Talent Tech Solutions",
                "location": "Hyderabad, India",
                "description": "This position is closed and should not be recommended.",
                "requirements": ["Python", "Django"],
                "experience_level": "junior",
                "salary_min": 500000,
                "salary_max": 900000,
                "status": "closed",
            },
        ]

        for data in demo_jobs:
            defaults = {
                "company": data["company"],
                "location": data["location"],
                "description": data["description"],
                "requirements": data["requirements"],
                "experience_level": data["experience_level"],
                "salary_min": data["salary_min"],
                "salary_max": data["salary_max"],
                "status": data.get("status", "active"),
                "recruiter": recruiter,
            }
            Job.objects.update_or_create(
                title=data["title"],
                recruiter=recruiter,
                defaults=defaults,
            )

        self.stdout.write(self.style.SUCCESS("Recommendation demo data is ready."))
        self.stdout.write("Candidate: demo.candidate@talentsphere.local / Demo@12345")
        self.stdout.write("Recruiter: demo.recruiter@talentsphere.local / Demo@12345")
        self.stdout.write("Open the candidate dashboard to see ranked recommendations.")
