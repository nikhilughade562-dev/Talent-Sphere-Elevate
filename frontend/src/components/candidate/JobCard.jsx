import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";

const JobCard = ({ job, showMatchScore = false }) => {
  const navigate = useNavigate();

  // Get recommendation percentage
  const matchScore = Math.round(
    Number(
      job.match_score ??
      job.matching_score ??
      job.score ??
      job.match_percentage ??
      0
    )
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {job.title}
          </h2>

          <p className="text-lg text-purple-700 font-semibold mt-1">
            {job.company}
          </p>
        </div>

        {/* Match Percentage - Only for Recommended Jobs */}
        {showMatchScore && (
          <div
            className={`px-4 py-3 rounded-xl text-lg font-bold ${
              matchScore >= 70
                ? "bg-green-100 text-green-700"
                : matchScore >= 40
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {matchScore}%
          </div>
        )}

      </div>

      {/* Job Details */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-purple-600" />
          {job.location}
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <FaBriefcase className="text-purple-600" />
          {job.experience_level || job.experience} level
        </div>

      </div>

      {/* Matched Skills */}
      {showMatchScore && job.matched_skills?.length > 0 && (
        <div className="mt-6">

          <h3 className="font-semibold text-gray-700 mb-3">
            Matched Skills
          </h3>

          <div className="flex flex-wrap gap-2">

            {job.matched_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
              >
                ✓ {skill}
              </span>
            ))}

          </div>

        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end items-center mt-8">

        <button
          onClick={() => navigate(`/candidate-job/${job.id}`)}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-xl transition"
        >
          More Details
        </button>

      </div>

    </div>
  );
};

export default JobCard;