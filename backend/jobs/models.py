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