import re
import PyPDF2
import docx
import pdfplumber


# --------------------------------------------------
# PDF TEXT EXTRACTION
# --------------------------------------------------

def extract_text_from_pdf(file):
    text = ""

    try:
        # First try pdfplumber
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""

    except Exception:
        # Fallback to PyPDF2
        try:
            file.seek(0)

            pdf_reader = PyPDF2.PdfReader(file)

            for page in pdf_reader.pages:
                text += page.extract_text() or ""

        except Exception:
            text = ""

    return text


# --------------------------------------------------
# DOCX TEXT EXTRACTION
# --------------------------------------------------

def extract_text_from_docx(file):
    text = ""

    try:
        document = docx.Document(file)

        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

    except Exception:
        text = ""

    return text


# --------------------------------------------------
# FILE TEXT EXTRACTION
# --------------------------------------------------

def extract_text_from_file(file):

    file_name = file.name.lower()

    try:

        if file_name.endswith(".pdf"):

            return extract_text_from_pdf(file)

        elif file_name.endswith(".docx"):

            return extract_text_from_docx(file)

        elif file_name.endswith(".txt"):

            return file.read().decode(
                "utf-8",
                errors="ignore"
            )

        elif file_name.endswith(".doc"):

            return file.read().decode(
                "utf-8",
                errors="ignore"
            )

        return ""

    except Exception as e:

        print("Resume extraction error:", e)

        return ""


# --------------------------------------------------
# SKILL DATABASE
# --------------------------------------------------

SKILLS_DATABASE = [

    # Programming Languages
    "python",
    "java",
    "javascript",
    "typescript",
    "c++",
    "c#",
    "ruby",
    "php",
    "swift",
    "kotlin",
    "go",
    "rust",
    "scala",
    "perl",
    "r",
    "matlab",

    # Frontend
    "html",
    "css",
    "react",
    "angular",
    "vue",
    "jquery",
    "bootstrap",
    "tailwind",
    "react native",
    "flutter",

    # Backend
    "node.js",
    "nodejs",
    "express",
    "django",
    "flask",
    "spring",
    "asp.net",

    # Database
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "redis",
    "elasticsearch",
    "cassandra",
    "dynamodb",
    "oracle",
    "sqlite",
    "firebase",

    # Cloud / DevOps
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "jenkins",
    "git",
    "github",
    "gitlab",
    "bitbucket",
    "terraform",
    "ansible",

    # AI / ML
    "machine learning",
    "deep learning",
    "nlp",
    "tensorflow",
    "pytorch",
    "keras",
    "scikit-learn",
    "pandas",
    "numpy",
    "matplotlib",
    "seaborn",
    "jupyter",

    # Data
    "hadoop",
    "spark",
    "kafka",

    # API
    "rest api",
    "graphql",
    "soap",
    "microservices",

    # Operating Systems
    "linux",
    "unix",
    "windows",
    "macos",
    "ios",
    "android",

    # Design
    "figma",
    "photoshop",
    "illustrator",
    "sketch",
    "adobe xd",
    "blender",
    "autocad",

    # Soft Skills
    "leadership",
    "communication",
    "problem solving",
    "teamwork",
    "critical thinking",
    "creativity",
    "time management",
    "project management",

    # Management
    "agile",
    "scrum",
    "kanban",
    "jira",
    "confluence",

    # Marketing / Business
    "sales",
    "marketing",
    "finance",
    "accounting",
    "hr",
    "recruitment",
    "seo",
    "sem",
    "social media",
    "salesforce",

    # Development
    "frontend",
    "backend",
    "full stack",
    "mobile development",
]


# --------------------------------------------------
# SKILL EXTRACTION
# --------------------------------------------------

def extract_skills(text):

    skills = []

    text_lower = text.lower()

    for skill in SKILLS_DATABASE:

        # Handle skills containing special regex characters
        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text_lower):

            skills.append(skill)

    return list(set(skills))


# --------------------------------------------------
# COMPLETE RESUME PARSER
# --------------------------------------------------

def parse_resume(file):

    text = extract_text_from_file(file)

    if not text.strip():

        return {
            "success": False,
            "text": "",
            "skills": []
        }

    skills = extract_skills(text)

    return {
        "success": True,
        "text": text,
        "skills": skills
    }