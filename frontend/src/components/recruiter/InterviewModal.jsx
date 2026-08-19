import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";

const InterviewModal = ({ application, onClose, onSuccess }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!application) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date) {
      setError("Interview Date is required.");
      return;
    }
    if (!time) {
      setError("Interview Time is required.");
      return;
    }
    if (!meetingLink) {
      setError("Meeting Link is required.");
      return;
    }

    // Meeting link URL validation
    try {
      new URL(meetingLink);
    } catch (_) {
      setError("Please enter a valid URL for the meeting link (e.g. https://meet.google.com/abc-defg-hij).");
      return;
    }

    // Past date/time validation
    const scheduledDateTime = new Date(`${date}T${time}`);
    if (scheduledDateTime < new Date()) {
      setError("Cannot schedule an interview in the past.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        candidateId: application.candidate,
        applicationId: application.id,
        jobId: application.job,
        scheduledDate: date,
        scheduledTime: time,
        meetingLink: meetingLink,
      };

      await axiosInstance.post("/interviews/", payload);
      toast.success("Interview scheduled successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      const backendError = err.response?.data?.error || "Failed to schedule interview.";
      setError(backendError);
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-purple-700 px-6 py-4 flex items-center justify-between text-white">
          <h2 className="text-xl font-bold">Schedule Interview</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-sm text-gray-600 mb-2">
            Scheduling interview for <strong className="text-gray-800">{application.candidate_name}</strong> for the position of <strong className="text-gray-800">{application.job_title}</strong>.
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Link
            </label>
            <input
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              required
              placeholder="https://meet.google.com/..."
              className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? "Scheduling..." : "Schedule Interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewModal;
