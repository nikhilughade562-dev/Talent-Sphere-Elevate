
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = (
        ("user", "User"),
        ("recruiter", "Recruiter"),
    )

    GENDER_CHOICES = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    )

    EXPERIENCE_CHOICES = (
        ("Fresher", "Fresher"),
        ("1-3 Years", "1-3 Years"),
        ("3-5 Years", "3-5 Years"),
        ("5+ Years", "5+ Years"),
    )

    username = None

    # Basic Details
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="user"
    )

    # Candidate Fields

    gender = models.CharField(
        max_length=20,
        choices=GENDER_CHOICES,
        blank=True
    )

    experience = models.CharField(
        max_length=30,
        choices=EXPERIENCE_CHOICES,
        blank=True
    )

    education = models.TextField(blank=True)
    skills = models.JSONField(default=list, blank=True)
    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True
    )

    resume_text = models.TextField(
        blank=True
    )

    parsed_resume = models.JSONField(
        default=dict,
        blank=True
    )
    
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    projects = models.JSONField(default=list, blank=True)
    certifications = models.JSONField(default=list, blank=True)
    years_of_experience = models.FloatField(null=True, blank=True)

    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)

    about = models.TextField(blank=True)

    # Recruiter Fields
    company_name = models.CharField(max_length=200, blank=True)
    company_website = models.URLField(blank=True)
    
    company_description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]



    def __str__(self):
        return f"{self.name} ({self.role})"