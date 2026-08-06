import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

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

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
          ${
            job.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.status}
        </span>

      </div>

      {/* Details */}

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-purple-600" />
          {job.location}
        </div>

        
      </div>
          <div className="mt-3 flex items-center gap-2 text-gray-600">
          <FaBriefcase className="text-purple-600" />
          {job.experience_level} level
        </div>

      {/* Footer */}

      <div className="flex justify-between items-center mt-8">

        <p className="text-gray-500 text-sm">
          23 Applicants
        </p>

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