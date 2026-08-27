from google import genai
from google.genai import types
from pydantic import BaseModel
from typing import List
import os


class LearningPathResponse(BaseModel):
    roadmap: List[str]
    recommendation: str


def generate_learning_path(
    skills,
    experience,
    education,
    target_role,
    career_goal
):

    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )

    prompt = f"""
You are a career guidance assistant.

Create a concise learning roadmap for the candidate based on
their current profile and career goal.

Candidate Information:

Skills:
{skills}

Experience:
{experience}

Education:
{education}

Target Role:
{target_role}

Career Goal:
{career_goal}


Instructions:

1. Create a practical learning roadmap for the target role.
2. Include only major skills or technologies.
3. Do NOT include detailed subtopics.
4. Do NOT list individual concepts under a technology.
5. Arrange the roadmap in a sensible learning order.
6. Keep the roadmap concise, around 8 to 15 items.
7. The roadmap should be personalized according to the candidate's
   current skills and experience.
8. Provide one short recommendation paragraph explaining what the
   candidate should focus on or how they should approach the roadmap.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=LearningPathResponse,
        ),
    )

    result = LearningPathResponse.model_validate_json(
        response.text
    )

    return result.model_dump()