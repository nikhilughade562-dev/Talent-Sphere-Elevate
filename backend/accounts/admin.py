from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    model = User

    list_display = (
        "id",
        "name",
        "email",
        "role",
        "is_active",
        "created_at",
    )

    ordering = ("id",)

    fieldsets = UserAdmin.fieldsets + (
        (
            "Additional Information",
            {
                "fields": (
                    "name",
                    "role",
                    "phone",
                    "location",
                    "profile_image",
                    "dob",
                    "gender",
                    "experience",
                    "education",
                    "skills",
                    "projects",
                    "internships",
                    "certifications",
                    "linkedin",
                    "github",
                    "portfolio",
                    "about",
                    "company_name",
                    "designation",
                    "company_website",
                    "company_logo",
                    "company_size",
                    "company_description",
                )
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "name",
                    "role",
                    "password1",
                    "password2",
                ),
            },
        ),
    )