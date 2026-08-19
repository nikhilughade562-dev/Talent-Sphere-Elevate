import React, { useContext, useEffect, useState } from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaEye,
  FaBriefcase,
} from "react-icons/fa";

import { CandidateContext } from "../../context/CandidateContext";
import ApplicationDetailsModal from "../../components/candidate/ApplicationDetailsModal"

const AppliedJobs = () => {
  const { appliedJobsList, appliedJobs } = useContext(CandidateContext);

  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    appliedJobsList();
  }, []);

const applications = appliedJobs ? appliedJobs : [];

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
    <div className="max-w-7xl mx-auto py-8 px-4">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Applied Jobs
        </h1>

        <p className="text-gray-500 mt-2">
          Track your job applications and view your application analysis.
        </p>
      </div>

      {/* Applications */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b text-sm font-semibold text-gray-600">
          <div>Company</div>
          <div>Job Title</div>
          <div>Applied Date</div>
          <div>Status</div>
          <div>Match Score</div>
          <div className="text-right">Action</div>
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="py-16 text-center">
            <FaBriefcase className="mx-auto text-4xl text-gray-300 mb-4" />

            <h2 className="text-xl font-semibold text-gray-700">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Jobs you apply for will appear here.
            </p>
          </div>
        )}

        {/* Application Rows */}
        {applications.map((application) => (
          <div
            key={application.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 px-6 py-5 border-b last:border-b-0 hover:bg-gray-50 transition"
          >

            {/* Company */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <FaBuilding className="text-purple-700" />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {application.job?.company || "N/A"}
                </p>

                <p className="text-sm text-gray-500 md:hidden">
                  {application.job?.title || "N/A"}
                </p>
              </div>
            </div>

            {/* Job Title */}
            <div className="hidden md:flex items-center">
              <p className="font-medium text-gray-700">
                {application.job?.title || "N/A"}
              </p>
            </div>

            {/* Applied Date */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendarAlt className="text-purple-600" />

              <span>
                {formatDate(application.applied_at)}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusStyle(
                  application.status
                )}`}
              >
                {getStatusLabel(application.status)}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center">
              <span className="font-semibold text-gray-800">
                {application.overall_score ?? 0}%
              </span>
            </div>

            {/* Action */}
            <div className="flex md:justify-end items-center">
              <button
                onClick={() => setSelectedApplication(application)}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl font-semibold transition"
              >
                <FaEye />
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};

export default AppliedJobs;

