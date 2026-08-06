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

  useEffect(() => {
    getJobs();
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

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        !filters.location || job.location === filters.location;

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
    <div className="space-y-6">

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid lg:grid-cols-4 gap-6">

        <div>
          <JobFilters
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />
        </div>

        <div className="lg:col-span-3 space-y-5">

          <h2 className="text-2xl font-bold text-gray-800">
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
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default Jobs;