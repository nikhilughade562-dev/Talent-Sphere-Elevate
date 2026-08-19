import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaClipboardCheck,
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarAlt,
} from "react-icons/fa";

import { CandidateContext } from "../../context/CandidateContext";

const CandidateNavbar = () => {
  const navigate = useNavigate();

  const { setCtoken } = useContext(CandidateContext);

  const logout = () => {
    setCtoken(false);
    localStorage.removeItem("ctoken");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh"); 
    navigate("/");
  };

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-purple-700 text-white"
        : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-50">

      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* Logo */}

        <h1
          onClick={() => navigate("/candidate-jobs")}
          className="text-2xl font-extrabold cursor-pointer bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent"
        >
          TalentSphere
        </h1>

        {/* Navigation */}

        <div className="flex items-center gap-2">

          <NavLink
            to="/candidate-jobs"
            className={navItemStyle}
          >
            <FaBriefcase />
            <span className="hidden md:block">
              Jobs
            </span>
          </NavLink>

          <NavLink
            to="/candidate-applied-jobs"
            className={navItemStyle}
          >
            <FaClipboardCheck />
            <span className="hidden md:block">
              Applied
            </span>
          </NavLink>

          <NavLink
            to="/candidate-interviews"
            className={navItemStyle}
          >
            <FaCalendarAlt />
            <span className="hidden md:block">
              Interviews
            </span>
          </NavLink>

          <NavLink
            to="/candidate-profile"
            className={navItemStyle}
          >
            <FaUserCircle />
            <span className="hidden md:block">
              Profile
            </span>
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            <FaSignOutAlt />
            <span className="hidden md:block">
              Logout
            </span>
          </button>

        </div>

      </div>

    </nav>
  );
};

export default CandidateNavbar;