import React,{useContext,useEffect,useState} from 'react'
import { RecruiterContext } from '../../context/RecruiterContext'
import {
  FaUserCircle,
  FaEnvelope,
  FaBuilding,
  FaGlobe,
  FaUserEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const RecruiterProfile = () => {
  const {rtoken,profile, setProfile,updateProfile, getProfileData}=useContext(RecruiterContext);

  useEffect(() => {
    getProfileData();
  }, [rtoken]);

  const [isEditing, setIsEditing] = useState(false);

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
    <div className="max-w-6xl mx-auto py-8">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="flex items-center gap-6">

            <FaUserCircle className="text-8xl text-purple-700" />

            <div>

              <h1 className="text-3xl font-bold">
                {profile.name}
              </h1>

              <p className="text-gray-500 mt-2">
                Recruiter
              </p>

              <div className="flex items-center gap-2 mt-2 text-gray-600">

                <FaBuilding />

                {profile.company_name}

              </div>

            </div>

          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="mt-6 md:mt-0 flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl transition"
            >
              <FaUserEdit />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className="mt-6 md:mt-0 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
            >
              <FaTimes />
              Cancel
            </button>
          )}

        </div>

      </div>

      {/* Personal Information */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Personal Information
        </h2>

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
            type="email"
          />

          <div>

            <label className="font-semibold block mb-2">
              Gender
            </label>

            <select
              name="gender"
              value={profile.gender}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 ${
                !isEditing ? "bg-gray-100" : "bg-white"
              }`}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

          </div>

        </div>

      </div>

      {/* Company Information */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Company Information
        </h2>

        <div className="space-y-6">

          <Input
            icon={<FaBuilding />}
            label="Company Name"
            name="company_name"
            value={profile.company_name}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Textarea
            label="Company Description"
            name="company_description"
            value={profile.company_description}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            icon={<FaGlobe />}
            label="Company Website"
            name="company_website"
            value={profile.company_website}
            onChange={handleChange}
            disabled={!isEditing}
          />

        </div>

      </div>

      {isEditing && (

        <div className="flex justify-end">

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
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
}) => {
  return (
    <div>

      <label className="font-semibold flex items-center gap-2 mb-2">

        {icon}

        {label}

      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
          disabled ? "bg-gray-100" : "bg-white"
        }`}
      />

    </div>
  );
};

const Textarea = ({
  label,
  name,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div>

      <label className="font-semibold block mb-2">
        {label}
      </label>

      <textarea
        rows={5}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600 ${
          disabled ? "bg-gray-100" : "bg-white"
        }`}
      />

    </div>
  );
};

export default RecruiterProfile;
