import React from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaBuilding,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
} from "react-icons/fa";

const ApplicationDetailsModal = ({ application, onClose }) => {
  if (!application) return null;

  const job = application.job;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "applied":
        return "bg-purple-100 text-purple-700";

      case "shortlisted":
        return "bg-blue-100 text-blue-700";

      case "interview":
        return "bg-yellow-100 text-yellow-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "applied":
        return "Applied";

      case "shortlisted":
        return "Shortlisted";

      case "interview":
        return "Interview";

      case "rejected":
        return "Rejected";

      default:
        return status || "Unknown";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-50 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Modal Header */}
        <div className="bg-white border-b px-6 py-5 flex items-start justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {job?.title || "Job Details"}
            </h1>

            <h2 className="text-xl text-purple-700 font-semibold mt-1">
              {job?.company || "N/A"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
          >
            <FaTimes className="text-gray-600" />
          </button>

        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-90px)] p-6">

          {/* Job Information */}
          <div className="bg-white rounded-2xl shadow border p-6 mb-6">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Location */}
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-purple-700 text-lg" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Location
                  </p>

                  <p className="font-semibold text-gray-800">
                    {job?.location || "N/A"}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-purple-700 text-lg" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Experience
                  </p>

                  <p className="font-semibold text-gray-800 capitalize">
                    {job?.experience_level || "N/A"}
                  </p>
                </div>
              </div>

              {/* Salary */}
              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-purple-700 text-lg" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Salary
                  </p>

                  <p className="font-semibold text-gray-800">
                    {job?.salary_min ?? 0} - {job?.salary_max ?? 0}
                  </p>
                </div>
              </div>

              {/* Recruiter */}
              <div className="flex items-center gap-3">
                <FaUserTie className="text-purple-700 text-lg" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Recruiter
                  </p>

                  <p className="font-semibold text-gray-800">
                    {job?.recruiter_name || "N/A"}
                  </p>
                </div>
              </div>

            </div>

            {/* Application Info */}
            <div className="border-t mt-6 pt-5 flex flex-wrap items-center justify-between gap-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Applied On
                </p>

                <p className="font-semibold text-gray-800">
                  {formatDate(application.applied_at)}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">
                  Application Status
                </p>

                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                    application.status
                  )}`}
                >
                  {getStatusLabel(application.status)}
                </span>
              </div>

            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow border p-6 mb-6">

            <div className="flex items-center gap-2 mb-6">
              <FaChartLine className="text-purple-700 text-xl" />

              <h2 className="text-2xl font-bold text-gray-800">
                Application Analysis
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-5">

              {/* Overall */}
              <div className="bg-purple-50 rounded-2xl p-5 text-center border border-purple-100">
                <p className="text-gray-500 text-sm mb-2">
                  Overall Match
                </p>

                <p className="text-4xl font-bold text-purple-700">
                  {application.overall_score ?? 0}%
                </p>
              </div>

              {/* Skill */}
              <div className="bg-gray-50 rounded-2xl p-5 text-center border">
                <p className="text-gray-500 text-sm mb-2">
                  Skill Score
                </p>

                <p className="text-3xl font-bold text-gray-800">
                  {application.skill_score ?? 0}%
                </p>
              </div>

              {/* Experience */}
              <div className="bg-gray-50 rounded-2xl p-5 text-center border">
                <p className="text-gray-500 text-sm mb-2">
                  Experience Score
                </p>

                <p className="text-3xl font-bold text-gray-800">
                  {application.experience_score ?? 0}%
                </p>
              </div>

              {/* Projects */}
              <div className="bg-gray-50 rounded-2xl p-5 text-center border">
                <p className="text-gray-500 text-sm mb-2">
                  Project Score
                </p>

                <p className="text-3xl font-bold text-gray-800">
                  {application.project_score ?? 0}%
                </p>
              </div>

            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl shadow border p-6 mb-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Job Requirements
            </h2>

            <div className="flex flex-wrap gap-3">
              {job?.requirements?.length > 0 ? (
                job.requirements.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-100 rounded-xl font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">
                  No requirements provided.
                </p>
              )}
            </div>

          </div>

          {/* Skills Analysis */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">

            {/* Matched Skills */}
            <div className="bg-white rounded-2xl shadow border p-6">

              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Matched Skills
              </h2>

              <div className="space-y-3">

                {application.matched_skills?.length > 0 ? (
                  application.matched_skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3"
                    >
                      <FaCheckCircle className="text-green-600" />

                      <span className="font-medium text-gray-700">
                        {skill}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No matched skills found.
                  </p>
                )}

              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white rounded-2xl shadow border p-6">

              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Missing Skills
              </h2>

              <div className="space-y-3">

                {application.missing_skills?.length > 0 ? (
                  application.missing_skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                    >
                      <FaTimesCircle className="text-red-600" />

                      <span className="font-medium text-gray-700">
                        {skill}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No missing skills.
                  </p>
                )}

              </div>
            </div>

          </div>

          {/* Job Description */}
          <div className="bg-white rounded-2xl shadow border p-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Job Description
            </h2>

            <p className="text-gray-600 leading-8">
              {job?.description || "No description provided."}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;

