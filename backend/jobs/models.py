from django.db import models
from django.conf import settings


class Job(models.Model):

    EXPERIENCE_CHOICES = (
        ("fresher", "Fresher"),
        ("junior", "Junior"),
        ("mid", "Mid"),
        ("senior", "Senior"),
    )

    STATUS_CHOICES = (
        ("active", "Active"),
        ("closed", "Closed"),
    )

    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)

    description = models.TextField()
    requirements = models.TextField()

    experience_level = models.CharField(
        max_length=20,
        choices=EXPERIENCE_CHOICES,
        default="mid"
    )

    salary_min = models.PositiveIntegerField()
    salary_max = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="active"
    )

    recruiter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

class Application(models.Model):
    STATUS_CHOICES = (
        ("applied", "Applied"),
        ("shortlisted", "Shortlisted"),
        ("interview", "Interview"),
        ("rejected", "Rejected"),
    )

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    candidate = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="applied")
    applied_at = models.DateTimeField(auto_now_add=True)
    
    # Match Score Caching
    overall_score = models.FloatField(null=True, blank=True)
    skill_score = models.FloatField(null=True, blank=True)
    experience_score = models.FloatField(null=True, blank=True)
    project_score = models.FloatField(null=True, blank=True)
    
    matched_skills = models.JSONField(default=list, blank=True)
    missing_skills = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["-applied_at"]
        unique_together = ("job", "candidate")

    def __str__(self):
        return f"{self.candidate.name} - {self.job.title}"