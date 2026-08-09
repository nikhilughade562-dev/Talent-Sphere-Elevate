import React, { useContext, useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaUserEdit,
  FaSave,
  FaTimes,
  FaFileAlt,
} from "react-icons/fa";

import { CandidateContext } from "../../context/CandidateContext";

const CandidateProfile = () => {
  const {
    ctoken,
    profile,
    getProfileData,
    setProfile,
    updateProfile,
    uploadResume
  } = useContext(CandidateContext);

  const [activeSection, setActiveSection] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfileData();
  }, [ctoken]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    const success = await updateProfile();

    if (success) {
      alert("Profile Updated Successfully");
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">

      {/* Profile Header */}

      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex flex-col md:flex-row items-center gap-5">

            <FaUserCircle className="text-8xl text-purple-700" />

            <div className="text-center md:text-left">

              <h1 className="text-3xl font-bold text-gray-800">
                {profile?.name || "Candidate"}
              </h1>

              <p className="text-gray-500 mt-1">
                Candidate Profile
              </p>

            </div>

          </div>

          {/* Edit button only for Personal Details */}

          {activeSection === "personal" && (
            <div>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl transition"
                >
                  <FaUserEdit />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Section Navigation */}

      <div className="bg-white rounded-2xl shadow-sm border p-2 mb-6">

        <div className="grid grid-cols-2 gap-2">

          <button
            onClick={() => {
              setActiveSection("personal");
              setIsEditing(false);
            }}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition ${
              activeSection === "personal"
                ? "bg-purple-700 text-white shadow"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
            }`}
          >
            <FaUserCircle />
            Personal Details
          </button>

          <button
            onClick={() => {
              setActiveSection("resume");
              setIsEditing(false);
            }}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition ${
              activeSection === "resume"
                ? "bg-purple-700 text-white shadow"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
            }`}
          >
            <FaFileAlt />
            Resume Information
          </button>

        </div>

      </div>

      {/* PERSONAL DETAILS */}

      {activeSection === "personal" && (
        <>

          {/* Personal Information */}

          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <Input
                icon={<FaUserCircle />}
                label="Full Name"
                name="name"
                value={profile?.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <Input
                icon={<FaEnvelope />}
                label="Email"
                name="email"
                value={profile?.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <div>

                <label className="font-semibold block mb-2">
                  Gender
                </label>

                <select
                  name="gender"
                  value={profile?.gender || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full border rounded-lg px-4 py-3 outline-none ${
                    !isEditing
                      ? "bg-gray-100"
                      : "bg-white focus:ring-2 focus:ring-purple-500"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

              </div>

            </div>

          </div>

          {/* Online Profiles */}

          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Online Profiles
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <Input
                icon={<FaLinkedin />}
                label="LinkedIn"
                name="linkedin"
                value={profile?.linkedin || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <Input
                icon={<FaGithub />}
                label="GitHub"
                name="github"
                value={profile?.github || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

            </div>

          </div>

          {/* About */}

          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 mb-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              About Me
            </h2>

            <textarea
              name="about"
              value={profile?.about || ""}
              onChange={handleChange}
              disabled={!isEditing}
              rows={5}
              placeholder="Tell recruiters about yourself..."
              className={`w-full border rounded-xl px-4 py-3 resize-none outline-none ${
                !isEditing
                  ? "bg-gray-100"
                  : "bg-white focus:ring-2 focus:ring-purple-500"
              }`}
            />

          </div>

          {/* Save */}

          {isEditing && (
            <div className="flex justify-end">

              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                <FaSave />
                Save Changes
              </button>

            </div>
          )}

        </>
      )}

      {/* RESUME INFORMATION */}

      {activeSection === "resume" && (
        <ResumeInformation />
      )}

    </div>
  );
};


/* ---------------------------------------------------
   Reusable Input
--------------------------------------------------- */

const Input = ({
  icon,
  label,
  name,
  value,
  onChange,
  disabled,
  type = "text",
}) => {
  return (
    <div>

      <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
        {icon}
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
          disabled
            ? "bg-gray-100 text-gray-600"
            : "bg-white focus:ring-2 focus:ring-purple-500"
        }`}
      />

    </div>
  );
};


/* ---------------------------------------------------
   Temporary Resume Section
--------------------------------------------------- */

const ResumeInformation = () => {

  const { profile, setProfile,uploadResume } = useContext(CandidateContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setMessage("");
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a resume first.");
      return;
    }
    try {
      setUploading(true);
      setError("");
      setMessage("");

      const response = await uploadResume(selectedFile);
      // Update profile with parsed skills

      setProfile({
        ...profile,
        skills: response.skills || [],
        resume: response.resume || "",
        resume_text: response.resume_text || "",
      });

      setMessage(response.message || "Resume uploaded successfully.");

      setSelectedFile(null);

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
        "Failed to upload resume."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Upload Card */}

      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">

        <div className="flex items-center gap-3 mb-2">

          <FaFileAlt className="text-purple-700 text-2xl" />

          <h2 className="text-2xl font-bold text-gray-800">
            Resume Information
          </h2>

        </div>

        <p className="text-gray-500 mb-8">
          Upload your resume to automatically extract your skills.
        </p>

        {/* Upload Area */}

        <div className="border-2 border-dashed border-purple-300 rounded-2xl p-10 text-center bg-purple-50">

          <FaFileAlt className="text-5xl text-purple-600 mx-auto mb-4" />

          <h3 className="text-xl font-semibold text-gray-800">
            Upload Your Resume
          </h3>

          <p className="text-gray-500 mt-2 mb-6">
            Upload a PDF, DOCX or TXT resume.
          </p>

          <label className="inline-block cursor-pointer">

            <span className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition inline-block">
              Choose Resume
            </span>

            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>

          {/* Selected File */}

          {selectedFile && (
            <div className="mt-5 text-gray-700 font-medium">
              Selected: {selectedFile.name}
            </div>
          )}

          {/* Upload Button */}

          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              {uploading ? "Uploading..." : "Upload & Parse Resume"}
            </button>
          )}

          {/* Success */}

          {message && (
            <p className="mt-5 text-green-600 font-medium">
              {message}
            </p>
          )}

          {/* Error */}

          {error && (
            <p className="mt-5 text-red-600 font-medium">
              {error}
            </p>
          )}

          <p className="text-sm text-gray-400 mt-4">
            Maximum file size: 5MB
          </p>

        </div>

      </div>


      {/* Parsed Skills */}

      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Skills Extracted From Resume
        </h2>

        {profile?.skills?.length > 0 ? (

          <div className="flex flex-wrap gap-3">

            {profile.skills.map((skill, index) => (

              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium"
              >
                {skill}
              </span>

            ))}

          </div>

        ) : (

          <p className="text-gray-500">
            No skills have been extracted yet. Upload your resume to get started.
          </p>

        )}

      </div>

    </div>
  );
};

export default CandidateProfile;