# TalentSphere

> An ATS-Friendly Resume Application & Job Board.

This platform allows candidates to register, view jobs, and apply, while allowing recruiters to register, post jobs, and view applications.

## 🚀 Features

### For Candidates
- **User Authentication**: Secure login and registration.
- **Job Board**: Browse and search for job openings.
- **Job Applications**: Apply for jobs with detailed information.
- **Profile Management**: Create and update professional profiles.
- **Resume Parsing**: Upload resume and extract key information.

### For Recruiters
- **Company Profiles**: Create and manage company information.
- **Job Management**: Create, update, and delete job listings.
- **Application Tracking**: View and manage candidate applications.
- **Candidate Screening**: Review resumes and application details.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Language**: JavaScript (ES6+)
- **Styling**: Custom CSS

### Backend
- **Framework**: Django 6.0
- **API**: Django Rest Framework (DRF)
- **Database**: SQLite (Development), PostgreSQL (Production)
- **Authentication**: JWT-based authentication

## 📁 Project Structure

```
TalentSphere/
├── frontend/         # React frontend application
├── backend/          # Django backend application
├── .gitignore        # Git ignore rules
└── README.md         # Project documentation
```

## ⚙️ Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Database migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🌐 Usage

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin

### Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend development server |
| `python manage.py runserver` | Start backend development server |
| `npm run build` | Build frontend for production |

## 🔐 Authentication

### Login
- **Email**: [EMAIL_ADDRESS]`
- **Password**: `password`

## 📦 Deployment

Refer to the deployment guide for production setup instructions.