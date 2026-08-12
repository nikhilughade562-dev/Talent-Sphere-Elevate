import React, { useState } from "react";
import axiosInstance from "../../api/axios";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: [],
    experience_level: "mid",
    salary_min: "",
    salary_max: "",
    status: "active",
  });

  const [skillInput, setSkillInput] = useState("");

  // Add skill to array
  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;

    // Prevent duplicate skills (case insensitive)
    const alreadyExists = formData.requirements.some(
      (existingSkill) => existingSkill.toLowerCase() === skill.toLowerCase(),
    );

    if (alreadyExists) {
      setSkillInput("");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, skill],
    }));
    setSkillInput("");
  };

  // Allow Enter key to add skill
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter(
        (skill) => skill !== skillToRemove,
      ),
    }));
  };

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
      const response = await axiosInstance.post(
        "/jobs/recruiter/jobs/",
        formData,
      );
      console.log(response);
      alert("Job Added Successfully");
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: [],
        experience_level: "mid",
        salary_min: "",
        salary_max: "",
        status: "active",
      });

      console.log(formData);
      setSkillInput("");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Failed to add job");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Job</h1>

        <p className="text-gray-500 mt-2 mb-8">
          Fill in the details below to publish a new job opening.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
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
            {" "}
            <label className="block mb-2 font-medium text-gray-700">
              {" "}
              Required Technical Skills{" "}
            </label>{" "}
            <p className="text-sm text-gray-500 mb-3">
              {" "}
              Add each skill separately. Press Enter or click Add Skill.{" "}
            </p>{" "}
            <div className="flex gap-3">
              {" "}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="e.g. Python, React.js, Docker"
                className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />{" "}
              <button
                type="button"
                onClick={addSkill}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold"
              >
                {" "}
                Add Skill{" "}
              </button>{" "}
            </div>{" "}
            {/* Selected Skills */}{" "}
            {formData.requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {" "}
                {formData.requirements.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-2 rounded-full"
                  >
                    {" "}
                    <span>{skill}</span>{" "}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-purple-700 hover:text-red-600 font-bold"
                    >
                      {" "}
                      ×{" "}
                    </button>{" "}
                  </div>
                ))}{" "}
              </div>
            )}{" "}
            {formData.requirements.length === 0 && (
              <p className="text-sm text-red-500 mt-2">
                {" "}
                Please add at least one required skill.{" "}
              </p>
            )}{" "}
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
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid Level</option>
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
