import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { RecruiterContext } from "../../context/RecruiterContext";

const RecruiterNavbar = () => {
  const navigate = useNavigate();
  const { setRtoken } = useContext(RecruiterContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setRtoken(false);
    localStorage.removeItem("rtoken");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");  // if you store token
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>

          {/* Logo */}
          <h1
            onClick={() => navigate("/recruiter-dashboard")}
            className="text-2xl font-extrabold cursor-pointer select-none bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent"
          >
            TalentSphere Elevate
          </h1>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/recruiter-profile")}
            className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300"
          >
            <FaUserCircle className="text-lg" />
            <span className="hidden sm:block">Profile</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            <FaSignOutAlt />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RecruiterNavbar;