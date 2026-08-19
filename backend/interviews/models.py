from django.db import models
from django.conf import settings
from jobs.models import Job, Application

class Interview(models.Model):
    STATUS_CHOICES = (
        ("upcoming", "Upcoming"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    )

    candidate = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="candidate_interviews"
    )
    recruiter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recruiter_interviews"
    )
    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name="interviews"
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="interviews"
    )
    scheduled_date = models.DateField()
    scheduled_time = models.TimeField()
    meeting_link = models.URLField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="upcoming"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["scheduled_date", "scheduled_time"]

    def __str__(self):
        return f"Interview with {self.candidate.name} for {self.job.title} on {self.scheduled_date}"
