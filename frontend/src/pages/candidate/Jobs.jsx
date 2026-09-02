import React, { useContext, useEffect, useMemo, useState } from "react";
import { CandidateContext } from "../../context/CandidateContext";

import SearchBar from "../../components/candidate/SearchBar";
import JobFilters from "../../components/candidate/JobFilters";
import JobCard from "../../components/candidate/JobCard";

const Jobs = () => {
  const { jobs, getJobs } = useContext(CandidateContext);

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    type: "",
    status: "",
  });

  // Recommended jobs
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [recommendationError, setRecommendationError] = useState("");

  // Get all jobs
  useEffect(() => {
    getJobs();
  }, []);

  // Get recommended jobs
  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        setLoadingRecommendations(true);
        setRecommendationError("");

        const token = localStorage.getItem("access");

        if (!token) {
          setRecommendationError(
            "Please login to see recommended jobs."
          );
          setLoadingRecommendations(false);
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:8000/api/jobs/recommended/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recommended jobs");
        }

        const data = await response.json();

        // Backend returns:
        // {
        //   count: 2,
        //   total_active_jobs: 2,
        //   results: [...]
        // }

        const recommendations = Array.isArray(data.results)
          ? data.results
          : [];

        setRecommendedJobs(recommendations);

      } catch (error) {
        console.error("Recommendation error:", error);

        setRecommendationError(
          "Unable to load recommended jobs right now."
        );
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendedJobs();
  }, []);

  const resetFilters = () => {
    setFilters({
      location: "",
      experience: "",
      type: "",
      status: "",
    });

    setSearchTerm("");
  };

  // Search and filter all jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {

      const matchesSearch =
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        !filters.location ||
        job.location === filters.location;

      const matchesExperience =
        !filters.experience ||
        job.experience === filters.experience;

      const matchesType =
        !filters.type ||
        job.type === filters.type;

      const matchesStatus =
        !filters.status ||
        job.status === filters.status;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesExperience &&
        matchesType &&
        matchesStatus
      );
    });
  }, [jobs, searchTerm, filters]);

  return (
    <div className="space-y-8">

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid lg:grid-cols-4 gap-6">

        {/* Filters */}
        <div>
          <JobFilters
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />
        </div>

        {/* Jobs */}
        <div className="lg:col-span-3 space-y-8">

          {/* ================================================= */}
          {/* RECOMMENDED JOBS */}
          {/* ================================================= */}

          <div>

            <div className="mb-5">

              <h2 className="text-2xl font-bold text-gray-800">
                Recommended Jobs For You
              </h2>

              <p className="text-gray-500 mt-1">
                Jobs recommended based on your skills and profile.
              </p>

            </div>

            {/* Loading */}
            {loadingRecommendations && (
              <div className="bg-white rounded-xl shadow border p-8 text-center">
                <p className="text-gray-500">
                  Finding the best jobs for you...
                </p>
              </div>
            )}

            {/* Error */}
            {!loadingRecommendations &&
              recommendationError && (
                <div className="bg-white rounded-xl shadow border p-8 text-center">

                  <p className="text-red-500">
                    {recommendationError}
                  </p>

                </div>
              )}

            {/* No recommendations */}
            {!loadingRecommendations &&
              !recommendationError &&
              recommendedJobs.length === 0 && (
                <div className="bg-white rounded-xl shadow border p-8 text-center">

                  <h3 className="text-lg font-semibold text-gray-700">
                    No Recommendations Yet
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Update your profile and skills to get
                    job recommendations.
                  </p>

                </div>
              )}

            {/* Recommended Jobs */}
            {!loadingRecommendations &&
              !recommendationError &&
              recommendedJobs.length > 0 && (

                <div className="space-y-5">

                  {recommendedJobs.map((recommendation) => (

                    <RecommendedJobCard
                      key={recommendation.job_id}
                      recommendation={recommendation}
                    />

                  ))}

                </div>

              )}

          </div>


          {/* ================================================= */}
          {/* AVAILABLE JOBS */}
          {/* ================================================= */}

          <div>

            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Available Jobs
            </h2>

            {filteredJobs.length === 0 ? (

              <div className="bg-white rounded-xl shadow border p-10 text-center">

                <h3 className="text-xl font-semibold text-gray-700">
                  No Jobs Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {filteredJobs.map((job) => (

                  <JobCard
                    key={job.id}
                    job={job}
                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};


/* ========================================================= */
/* RECOMMENDED JOB CARD */
/* ========================================================= */

const RecommendedJobCard = ({ recommendation }) => {

  const {
    job_id,
    title,
    company,
    location,
    experience_level,
    overall_score,
    matched_skills,
    missing_skills,
    recommendation_level,
  } = recommendation;

  const score = Number(overall_score || 0);

  const scoreColor =
    score >= 70
      ? "bg-green-100 text-green-700"
      : score >= 40
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (

    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="text-lg text-purple-700 font-semibold mt-1">
            {company}
          </p>

        </div>


        {/* Percentage */}

        <div
          className={`px-4 py-3 rounded-xl text-xl font-bold ${scoreColor}`}
        >
          {score}%
        </div>

      </div>


      {/* Job Details */}

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="flex items-center gap-2 text-gray-600">

          <span className="text-purple-600">
            📍
          </span>

          {location}

        </div>


        <div className="flex items-center gap-2 text-gray-600">

          <span className="text-purple-600">
            💼
          </span>

          {experience_level} level

        </div>

      </div>


      {/* Recommendation Level */}

      <div className="mt-5">

        <p className="font-semibold text-gray-700">
          {recommendation_level}
        </p>

      </div>


      {/* Matched Skills */}

      {matched_skills?.length > 0 && (

        <div className="mt-5">

          <p className="font-semibold text-gray-700 mb-2">
            Matched Skills
          </p>

          <div className="flex flex-wrap gap-2">

            {matched_skills.map((skill, index) => (

              <span
                key={index}
                className="px-3 py-2 rounded-full bg-green-50 text-green-700 text-sm"
              >
                ✓ {skill}
              </span>

            ))}

          </div>

        </div>

      )}


      {/* Missing Skills */}

      {missing_skills?.length > 0 && (

        <div className="mt-5">

          <p className="font-semibold text-gray-700 mb-2">
            Skills to Improve
          </p>

          <div className="flex flex-wrap gap-2">

            {missing_skills.map((skill, index) => (

              <span
                key={index}
                className="px-3 py-2 rounded-full bg-orange-50 text-orange-700 text-sm"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

      )}


      {/* Footer */}

      <div className="flex justify-end mt-7">

        <button
          onClick={() =>
            window.location.href = `/candidate-job/${job_id}`
          }
          className="bg-purple-700 hover:bg-purple-800 text-white px-7 py-3 rounded-xl transition"
        >
          More Details →
        </button>

      </div>

    </div>

  );
};


export default Jobs;