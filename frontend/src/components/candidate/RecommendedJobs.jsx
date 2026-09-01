import React from "react";
import { FaArrowRight, FaCheckCircle, FaLightbulb, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const scoreClass = (score) => {
  if (score >= 80) return "text-green-700 bg-green-100";
  if (score >= 60) return "text-blue-700 bg-blue-100";
  if (score >= 40) return "text-yellow-700 bg-yellow-100";
  return "text-gray-700 bg-gray-100";
};

const RecommendedJobs = ({ recommendations, loading, error, onRetry }) => {
  const navigate = useNavigate();

  return (
    <section className="mt-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recommended For You</h2>
          <p className="text-gray-500 mt-1">
            Jobs ranked using your resume skills, experience and project keywords.
          </p>
        </div>
        <button
          onClick={onRetry}
          disabled={loading}
          className="text-purple-700 font-semibold hover:text-purple-900 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Refresh recommendations"}
        </button>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border shadow-sm p-8 text-center text-gray-500">
          Finding the best jobs for your profile...
        </div>
      )}

      {!loading && error && (
        <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={onRetry}
            className="mt-4 bg-purple-700 text-white px-5 py-2 rounded-xl font-semibold"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && recommendations.length === 0 && (
        <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">
          <FaLightbulb className="mx-auto text-3xl text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">No recommendations yet</h3>
          <p className="text-gray-500 mt-2">
            Upload your resume and make sure recruiters have active jobs posted.
          </p>
        </div>
      )}

      {!loading && !error && recommendations.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {recommendations.map((job) => (
            <div
              key={job.job_id}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                  <p className="text-purple-700 font-semibold mt-1">{job.company}</p>
                </div>
                <div className={`shrink-0 px-3 py-2 rounded-xl font-bold ${scoreClass(job.overall_score)}`}>
                  {job.overall_score}%
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-5">
                <span className="flex items-center gap-2"><FaMapMarkerAlt />{job.location}</span>
                <span className="flex items-center gap-2"><FaBriefcase />{job.experience_level}</span>
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-700">{job.recommendation_level}</p>

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Matched Skills</p>
                <div className="flex flex-wrap gap-2">
                  {job.matched_skills?.length ? job.matched_skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                      <FaCheckCircle /> {skill}
                    </span>
                  )) : <span className="text-sm text-gray-400">No matched skills yet</span>}
                </div>
              </div>

              {job.missing_skills?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Skills to Improve</p>
                  <div className="flex flex-wrap gap-2">
                    {job.missing_skills.slice(0, 6).map((skill) => (
                      <span key={skill} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate(`/candidate-job/${job.job_id}`)}
                className="mt-6 w-full bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                View Job <FaArrowRight />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedJobs;
