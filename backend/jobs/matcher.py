import math
import re

def parse_experience(experience_str):
    """
    Convert an experience string (e.g., '1-3 Years', '5+ Years') into a float.
    Returns estimated years of experience.
    """
    if not experience_str:
        return 0.0
    
    if isinstance(experience_str, (int, float)):
        return float(experience_str)

    exp_str = experience_str.lower().strip()
    
    if "fresher" in exp_str or exp_str == "0":
        return 0.0
    
    nums = re.findall(r'\d+', exp_str)
    if not nums:
        return 0.0
    
    if len(nums) == 1:
        return float(nums[0])
    
    
    return (float(nums[0]) + float(nums[1])) / 2.0

def calculate_match(candidate, job):
    """
    Calculate match score for a candidate against a job.
    Weights: 60% Skills, 20% Experience, 20% Projects/Keywords
    Returns a dictionary containing match metrics.
    """
    WEIGHT_SKILL = 0.60
    WEIGHT_EXP = 0.20
    WEIGHT_PROJECT = 0.20
    from accounts.resume_parser import extract_skills,normalize_skill
    # 1. Skill Match
    candidate_skills = {
    normalize_skill(skill)
    for skill in candidate.skills
    }

    job_required_skills = {
    normalize_skill(skill)
    for skill in job.requirements
    }
    
    if not job_required_skills:
        skill_score = 1.0
        matched_skills = list(candidate_skills)
        missing_skills = []
    else:
        matched_skills = list(candidate_skills.intersection(job_required_skills))
        missing_skills = list(job_required_skills - candidate_skills)
        skill_score = len(matched_skills) / len(job_required_skills)

    # 2. Experience Match
    candidate_exp = candidate.years_of_experience
    if candidate_exp is None:
        candidate_exp = parse_experience(candidate.experience)
        
    job_exp_str = job.experience_level
    job_exp_req = 0.0
    if job_exp_str == "fresher":
        job_exp_req = 0.0
    elif job_exp_str == "junior":
        job_exp_req = 1.0
    elif job_exp_str == "mid":
        job_exp_req = 3.0
    elif job_exp_str == "senior":
        job_exp_req = 5.0
        
    if job_exp_req == 0.0:
        experience_score = 1.0
    else:
        if candidate_exp >= job_exp_req:
            experience_score = 1.0
        else:
            experience_score = candidate_exp / job_exp_req

    # 3. Project / Keywords Match
    project_text = " ".join(candidate.projects).lower() if isinstance(candidate.projects, list) else str(candidate.projects).lower()
    project_text += " " + str(candidate.about).lower() + " " + str(candidate.resume_text).lower()
    
    job_keywords = job_required_skills
    project_matches = 0
    for kw in job_keywords:
        if kw.lower() in project_text:
            project_matches += 1
            
    if not job_keywords:
        project_score = 1.0
    else:
        project_score = project_matches / len(job_keywords)
        
    overall_score = (skill_score * WEIGHT_SKILL) + (experience_score * WEIGHT_EXP) + (project_score * WEIGHT_PROJECT)
    
    return {
        "overall_score": round(overall_score * 100, 2),
        "skill_score": round(skill_score * 100, 2),
        "experience_score": round(experience_score * 100, 2),
        "project_score": round(project_score * 100, 2),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }
