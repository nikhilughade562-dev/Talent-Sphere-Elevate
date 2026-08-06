import React, { useContext, useState, useEffect } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaFileAlt,
  FaUserEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { CandidateContext } from "../../context/CandidateContext";

const CandidateProfile = () => {
  const {
    ctoken,
    setCtoken,
    profile,
    getProfileData,
    setProfile,
    updateProfile,
  } = useContext(CandidateContext);
  const [isEditing, setIsEditing] = useState(false);
  const [skillInput, setSkillInput] = useState("");

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

  const addSkill = () => {
    const newSkill = skillInput.trim();
    if (!newSkill) return;
    if (profile.skills?.includes(newSkill)) {
      return;
    }
    setProfile({
      ...profile,
      skills: [...(profile.skills || []), newSkill],
    });
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Header */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <FaUserCircle className="text-8xl text-purple-700" />

            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl"
              >
                <FaUserEdit />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
              >
                <FaTimes />
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            icon={<FaUserCircle />}
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            icon={<FaEnvelope />}
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <div>
            <label className="font-semibold block mb-2">Gender</label>

            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Professional Information */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Professional Information</h2>

        <div className="space-y-6">
          <div>
            <label className="font-semibold block mb-3">Skills</label>

            {/* Skill Badges */}

            <div className="flex flex-wrap gap-3 mb-4">
              {(profile.skills || []).map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full"
                >
                  <span>{skill}</span>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Skill Input */}

            {isEditing && (
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Type skill and press Enter"
                className="w-full border rounded-lg px-4 py-3"
              />
            )}
          </div>

          <Textarea
            label="Education"
            name="education"
            value={profile.education}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Textarea
            label="About Me"
            name="about"
            value={profile.about}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Social Links */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Online Profiles</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            icon={<FaLinkedin />}
            label="LinkedIn"
            name="linkedin"
            value={profile.linkedin}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            icon={<FaGithub />}
            label="GitHub"
            name="github"
            value={profile.github}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            icon={<FaFileAlt />}
            type="file"
            label="Resume"
            name="resume"
            value={profile.resume}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
          >
            <FaSave />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

const Input = ({
  icon,
  label,
  name,
  value,
  onChange,
  disabled,
  type = "text",
}) => (
  <div>
    <label className="font-semibold mb-2 flex items-center gap-2">
      {icon}
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full border rounded-lg px-4 py-3 ${
        disabled ? "bg-gray-100" : "bg-white"
      }`}
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="font-semibold block mb-2">{label}</label>

    <textarea
      rows={4}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full border rounded-lg px-4 py-3 resize-none ${
        disabled ? "bg-gray-100" : "bg-white"
      }`}
    />
  </div>
);

export default CandidateProfile;
