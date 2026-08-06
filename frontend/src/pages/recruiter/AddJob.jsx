import React, { useState } from "react";
import axiosInstance from '../../api/axios'

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    experience_level: "mid",
    salary_min: "",
    salary_max: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/jobs/recruiter/jobs/", formData);
    console.log(response);
    alert("Job Added Successfully");
    setFormData({
            title: "",
            company: "",
            location: "",
            description: "",
            requirements: "",
            experience_level: "Mid",
            salary_min: "",
            salary_max: "",
            status: "active",
        });
      
    console.log(formData);
    } catch (error) {
      console.log(error);
        alert(error.response?.data?.error || "Failed to add job");
    }

  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Add New Job
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Fill in the details below to publish a new job opening.
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-6"
        >
          {/* Job Title & Company */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Job Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Frontend Developer"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Company Name
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Google"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

          </div>

          {/* Location */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Bangalore, India"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Job Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the job role..."
              className="w-full border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Requirements */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Requirements
            </label>

            <textarea
              rows="6"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
              placeholder="React, Node.js, MongoDB..."
              className="w-full border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Experience & Status */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Experience Level
              </label>

              <select
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Job Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>

          </div>

          {/* Salary */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Minimum Salary
              </label>

              <input
                type="number"
                name="salary_min"
                value={formData.salary_min}
                onChange={handleChange}
                placeholder="500000"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Maximum Salary
              </label>

              <input
                type="number"
                name="salary_max"
                value={formData.salary_max}
                onChange={handleChange}
                placeholder="1200000"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

          </div>

          {/* Submit Button */}

          <div className="pt-4">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
            >
              Publish Job
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddJob;
