import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaRobot, FaFileAlt, FaCheckCircle, FaSearch, FaUserTie } from 'react-icons/fa';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Intelligent ATS & <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              AI Resume Screening
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Talent Sphere Elevate streamlines hiring. We use advanced Natural Language Processing to extract skills from resumes and match them to ideal job opportunities instantly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/candidate-login')}
              className="px-8 py-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2"
            >
              <FaFileAlt /> I'm a Candidate
            </button>
            <button
              onClick={() => navigate('/recruiter-login')}
              className="px-8 py-4 bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center gap-2"
            >
              <FaUserTie /> I'm a Recruiter
            </button>
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About The Project</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Finding the right candidate for a job—or the right job for a candidate—is notoriously difficult. Resumes come in thousands of formats, and manually screening them takes recruiters countless hours.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Talent Sphere Elevate (Milestone 2)</strong> solves this by introducing a professional Applicant Tracking System (ATS). It leverages Python's NLP (spaCy) to automatically parse unstructured PDF and DOCX resumes into structured data.
              </p>
              <ul className="space-y-3">
                {[
                  "Deterministic algorithm weights Skills (60%), Experience (20%), and Projects (20%).",
                  "Automatically flags missing required skills to candidates.",
                  "Recruiters see instantly ranked shortlists for every job posting."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
              <div className="bg-white rounded-2xl shadow-xl p-8 relative border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Match Calculation</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Overall Job Fit</span>
                    <span className="text-sm font-bold text-green-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Matched Skills (90%)</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md">React</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md">Node.js</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md">MongoDB</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Missing Skills</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-red-50 text-red-600 border border-red-200 text-xs rounded-md">AWS</span>
                      <span className="px-2 py-1 bg-red-50 text-red-600 border border-red-200 text-xs rounded-md">Docker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need to automate your recruitment pipeline.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <FaRobot className="text-2xl text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">NLP Parsing</h3>
              <p className="text-gray-600">
                We utilize PyPDF2, docx, and spaCy to intelligently extract text, contact information, education, and normalized skill entities directly from raw documents.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <FaSearch className="text-2xl text-indigo-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Matching</h3>
              <p className="text-gray-600">
                Our algorithm calculates a percentage match based on required skills and years of experience, completely eliminating arbitrary candidate scoring.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <FaUserTie className="text-2xl text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recruiter ATS</h3>
              <p className="text-gray-600">
                A dedicated dashboard for recruiters. View applications, filter by match scores, instantly see missing requirements, and shortlist candidates with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HeroSection;
