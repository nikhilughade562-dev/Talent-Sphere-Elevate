import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaClock, FaVideo, FaTimesCircle, FaCheckCircle, FaUserCircle } from "react-icons/fa";

const RecruiterInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInterviews = async () => {
    try {
      const res = await axiosInstance.get("/interviews/recruiter/");
      setInterviews(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load scheduled interviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const cancelInterview = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this interview?")) {
      return;
    }

    try {
      await axiosInstance.patch(`/interviews/${id}/cancel/`);
      toast.success("Interview cancelled successfully");
      fetchInterviews();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel interview");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  if (loading) return <div className="text-center mt-20">Loading scheduled interviews...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Scheduled Interviews</h1>
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-4 text-left">Candidate</th>
                <th className="px-5 py-4 text-left">Job / Position</th>
                <th className="px-5 py-4 text-left">Date & Time</th>
                <th className="px-5 py-4 text-left">Meeting Link</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No interviews scheduled yet.
                  </td>
                </tr>
              ) : (
                interviews.map((interview) => (
                  <tr key={interview.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-5 py-4">
                      <div className="font-semibold flex items-center gap-2">
                        <FaUserCircle className="text-gray-400" size={20} />
                        {interview.candidate_name}
                      </div>
                      <div className="text-xs text-gray-500">{interview.candidate_email}</div>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {interview.job_title}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FaCalendarAlt className="text-purple-600" />
                        {interview.scheduledDate}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <FaClock className="text-purple-400" />
                        {interview.scheduledTime}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-purple-700 hover:text-purple-900 font-medium hover:underline text-sm"
                      >
                        <FaVideo className="text-purple-600" />
                        Join Meeting
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusStyle(
                          interview.status
                        )}`}
                      >
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {interview.status === "upcoming" && (
                        <button
                          onClick={() => cancelInterview(interview.id)}
                          className="flex items-center gap-1 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm transition"
                        >
                          <FaTimesCircle />
                          Cancel
                        </button>
                      )}
                      {interview.status !== "upcoming" && (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterInterviews;
