import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaBuilding,
} from "react-icons/fa";
import { CandidateContext } from "../../context/CandidateContext";
import axios from "axios";
import { toast } from "react-toastify";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { jobs } = useContext(CandidateContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // GET JOB DETAILS
  // --------------------------------------------------

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        setLoading(true);

        // First check available jobs already loaded in context
        const existingJob = jobs.find(
          (item) => item.id === Number(id)
        );

        if (existingJob) {
          setJob(existingJob);
          setLoading(false);
          return;
        }

        // If not found, fetch all active jobs from backend
        const response = await axios.get(
          "http://127.0.0.1:8000/api/jobs/"
        );

        const allJobs = response.data;

        // Handle possible API response formats
        const jobList = Array.isArray(allJobs)
          ? allJobs
          : allJobs.results || allJobs.jobs || [];

        const foundJob = jobList.find(
          (item) => item.id === Number(id)
        );

        if (foundJob) {
          setJob(foundJob);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    getJobDetails();
  }, [id, jobs]);

  // --------------------------------------------------
  // APPLY TO JOB
  // --------------------------------------------------

  const applyHandler = async () => {
    try {
      const ctoken = localStorage.getItem("ctoken");

      if (!ctoken) {
        toast.error("Please login first.");
        return;
      }

      const res = await axios.post(
        `http://127.0.0.1:8000/api/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${ctoken}`,
          },
        }
      );

      toast.success(
        `Applied Successfully! Match Score: ${res.data.match_score}%`
      );
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to apply"
      );
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="text-gray-500 text-lg">
          Loading job details...
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // JOB NOT FOUND
  // --------------------------------------------------

  if (!job) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Job Not Found
          </h2>

          <p className="text-gray-500 mb-6">
            The requested job does not exist.
          </p>

          <button
            onClick={() => navigate("/candidate-jobs")}
            className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">

      {/* Back Button */}

      <button
        onClick={() => navigate("/candidate-jobs")}
        className="flex items-center gap-2 text-purple-700 font-semibold mb-6 hover:underline"
      >
        <FaArrowLeft />
        Back to Jobs
      </button>

      {/* HEADER */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">

        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              {job.title}
            </h1>

            <h2 className="text-2xl text-purple-700 font-semibold mt-2">
              {job.company}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-6 text-gray-600">

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-purple-600" />
                {job.location}
              </div>

              <div className="flex items-center gap-2">
                <FaBriefcase className="text-purple-600" />
                {job.experience_level} level
              </div>

              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-purple-600" />

                ₹{job.salary_min} - ₹{job.salary_max}
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-purple-600" />

                Posted {job.posted || "Recently"}
              </div>

            </div>

          </div>

          <button
            onClick={applyHandler}
            className="self-start bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-xl text-lg font-semibold transition"
          >
            Apply Now
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}

        <div className="lg:col-span-2 space-y-6">

          {/* JOB DESCRIPTION */}

          <div className="bg-white rounded-2xl shadow border p-6">

            <h2 className="text-2xl font-bold mb-4">
              Job Description
            </h2>

            <p className="text-gray-600 leading-8">
              {job.description}
            </p>

          </div>

          {/* REQUIREMENTS */}

          <div className="bg-white rounded-2xl shadow border p-6">

            <h2 className="text-2xl font-bold mb-4">
              Requirements
            </h2>

            <div className="flex flex-wrap gap-3">

              {(
                job.requirements ||
                job.required_skills ||
                []
              ).map((requirement, index) => (

                <span
                  key={index}
                  className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full font-medium"
                >
                  {requirement}
                </span>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div>

          <div className="bg-white rounded-2xl shadow border p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Job Overview
            </h2>

            <div className="space-y-5">

              {/* COMPANY */}

              <div className="flex items-center gap-3">

                <FaBuilding className="text-purple-700" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Company
                  </p>

                  <p className="font-semibold">
                    {job.company}
                  </p>

                </div>

              </div>

              {/* EXPERIENCE */}

              <div className="flex items-center gap-3">

                <FaBriefcase className="text-purple-700" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Experience
                  </p>

                  <p className="font-semibold">
                    {job.experience_level}
                  </p>

                </div>

              </div>

              {/* LOCATION */}

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-purple-700" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Location
                  </p>

                  <p className="font-semibold">
                    {job.location}
                  </p>

                </div>

              </div>

              {/* SALARY */}

              <div className="flex items-center gap-3">

                <FaMoneyBillWave className="text-purple-700" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Salary
                  </p>

                  <p className="font-semibold">
                    ₹{job.salary_min} - ₹{job.salary_max}
                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={applyHandler}
              className="w-full mt-8 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold transition"
            >
              Apply Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;