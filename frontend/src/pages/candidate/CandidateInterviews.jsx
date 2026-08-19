import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaClock, FaVideo, FaBuilding } from "react-icons/fa";

const CandidateInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInterviews = async () => {
    try {
      const res = await axiosInstance.get("/interviews/candidate/");
      // Filter for upcoming interviews
      const upcomingInterviews = res.data.filter(
        (interview) => interview.status === "upcoming"
      );
      setInterviews(upcomingInterviews);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your interviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading interviews...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Scheduled Interviews</h1>

      {interviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
          <p className="text-gray-500 text-lg font-medium">
            No interviews scheduled yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-2xl border border-purple-100 shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                  Upcoming Interview
                </span>

                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {interview.job_title}
                </h2>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <FaBuilding className="text-gray-400" />
                  <span>Position: {interview.job_title}</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
                    <FaCalendarAlt className="text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-semibold text-gray-800">{interview.scheduledDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
                    <FaClock className="text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-semibold text-gray-800">{interview.scheduledTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={interview.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-xl transition duration-300"
                >
                  <FaVideo />
                  Join Interview
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateInterviews;
