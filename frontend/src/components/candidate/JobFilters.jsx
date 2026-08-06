import React from "react";

const JobFilters = ({
  filters,
  setFilters,
  resetFilters,
}) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Filters
      </h2>

      {/* Location */}

      <div className="mb-5">

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location
        </label>

        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
        >
          <option value="">All Locations</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Pune</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Nagpur</option>
        </select>

      </div>

      {/* Experience */}

      <div className="mb-5">

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Experience
        </label>

        <select
          name="experience"
          value={filters.experience}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
        >
          <option value="">All</option>
          <option>Entry Level</option>
          <option>Mid Level</option>
          <option>Senior Level</option>
        </select>

      </div>

      {/* Job Type */}

      <div className="mb-5">

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Job Type
        </label>

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
        >
          <option value="">All</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

      </div>

      {/* Status */}

      <div className="mb-8">

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Status
        </label>

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
        >
          <option value="">All</option>
          <option>Active</option>
          <option>Closed</option>
        </select>

      </div>

      <button
        onClick={resetFilters}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold transition"
      >
        Reset Filters
      </button>

    </div>
  );
};

export default JobFilters;