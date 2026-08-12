import re
import PyPDF2
import docx
import pdfplumber
import spacy

try:
    nlp = spacy.load("en_core_web_sm")
except Exception:
    nlp = None
    print("Warning: spacy en_core_web_sm model not loaded.")

# --------------------------------------------------
# TEXT EXTRACTION
# --------------------------------------------------

def extract_text_from_pdf(file):
    text = ""
    try:
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
    except Exception:
        try:
            file.seek(0)
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() or ""
        except Exception:
            text = ""
    return text

def extract_text_from_docx(file):
    text = ""
    try:
        document = docx.Document(file)
        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"
    except Exception:
        text = ""
    return text

def extract_text_from_file(file):
    file_name = file.name.lower()
    try:
        if file_name.endswith(".pdf"):
            return extract_text_from_pdf(file)
        elif file_name.endswith(".docx"):
            return extract_text_from_docx(file)
        elif file_name.endswith(".txt") or file_name.endswith(".doc"):
            return file.read().decode("utf-8", errors="ignore")
        return ""
    except Exception as e:
        print("Resume extraction error:", e)
        return ""

# --------------------------------------------------
# SKILLS DATABASE
# --------------------------------------------------

SKILLS_DATABASE = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c++", "c#", "ruby", "php", "swift", "kotlin", "go", "rust", "scala", "perl", "r", "matlab",
    # Frontend
    "html", "css", "react", "angular", "vue", "jquery", "bootstrap", "tailwind", "react native", "flutter",
    # Backend
    "node.js", "nodejs", "express", "django", "flask", "spring", "asp.net",
    # Database
    "sql", "mysql", "postgresql", "mongodb", "redis", "elasticsearch", "cassandra", "dynamodb", "oracle", "sqlite", "firebase",
    # Cloud / DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "git", "github", "gitlab", "bitbucket", "terraform", "ansible",
    # AI / ML
    "machine learning", "deep learning", "nlp", "tensorflow", "pytorch", "keras", "scikit-learn", "pandas", "numpy", "matplotlib", "seaborn", "jupyter",
    # Data
    "hadoop", "spark", "kafka",
    # API
    "rest api", "graphql", "soap", "microservices",
    # Operating Systems
    "linux", "unix", "windows", "macos", "ios", "android",
    # Design
    "figma", "photoshop", "illustrator", "sketch", "adobe xd", "blender", "autocad",
    # Soft Skills
    "leadership", "communication", "problem solving", "teamwork", "critical thinking", "creativity", "time management", "project management",
    # Management
    "agile", "scrum", "kanban", "jira", "confluence",
    # Marketing / Business
    "sales", "marketing", "finance", "accounting", "hr", "recruitment", "seo", "sem", "social media", "salesforce",
    # Development
    "frontend", "backend", "full stack", "mobile development",
]

# Mapping to normalize skills
SKILL_NORMALIZATION = {
    "react.js": "react",
    "reactjs": "react",

    "nodejs": "node.js",

    "express.js": "express",
    "expressjs": "express",

    "restful api": "rest api",
    "restful apis": "rest api",
    "rest api": "rest api",
    "rest apis": "rest api",

    "html5": "html",
    "css3": "css",

    "oops": "oop",
    "object oriented programming": "oop",
    "object-oriented programming": "oop",

    "dsa": "dsa",
    "data structures and algorithms": "dsa"
}

# --------------------------------------------------
# NLP EXTRACTION LOGIC
# --------------------------------------------------
def normalize_skill(skill):
    skill = str(skill).lower().strip()
    return SKILL_NORMALIZATION.get(skill, skill)

def extract_skills(text):
    skills = []
    text_lower = text.lower()
    for skill in SKILLS_DATABASE:
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text_lower):
            normalized_skill = SKILL_NORMALIZATION.get(skill, skill.title())
            skills.append(normalized_skill)
    return list(set(skills))

def extract_email(text):
    pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
    emails = re.findall(pattern, text)
    return emails[0] if emails else ""

def extract_phone(text):
    pattern = r"\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}"
    phones = re.findall(pattern, text)
    return phones[0] if phones else ""

def extract_location(text):
    if nlp:
        doc = nlp(text[:2000]) # only check first part for location
        locations = [ent.text for ent in doc.ents if ent.label_ == "GPE"]
        if locations:
            return locations[0]
    return ""

def extract_experience_years(text):
    # Regex to find patterns like '5 years of experience', '3+ years', '1-3 years'
    pattern = r"(\d+(?:\.\d+)?)(?:\s*(?:\+|to|-)\s*\d+)?\s*(?:years|yrs)\s*(?:of)?\s*(?:experience|exp)"
    matches = re.findall(pattern, text.lower())
    if matches:
        return float(matches[0])
    return None

def parse_resume(file):
    text = extract_text_from_file(file)
    if not text.strip():
        return {
            "success": False,
            "text": "",
            "skills": [],
            "email": "",
            "phone": "",
            "location": "",
            "years_of_experience": None
        }

    skills = extract_skills(text)
    email = extract_email(text)
    phone = extract_phone(text)
    location = extract_location(text)
    yoe = extract_experience_years(text)

    # Simplified heuristic for education, certifications, projects
    # In a full system, we would parse sections based on headings
    
    return {
        "success": True,
        "text": text,
        "skills": skills,
        "email": email,
        "phone": phone,
        "location": location,
        "years_of_experience": yoe
    }