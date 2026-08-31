import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaFileAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <h3 className="font-bold text-xl text-gray-900 tracking-tight hidden sm:block">
            TalentSphere<span className="text-purple-700">Elevate</span>
          </h3>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/candidate-login")}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-purple-700 transition px-2 py-2"
          >
            <FaFileAlt className="hidden sm:block" /> Candidate
          </button>

          <button
            onClick={() => navigate("/recruiter-login")}
            className="flex items-center gap-2 text-sm font-semibold bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            <FaUserTie className="hidden sm:block" /> Recruiter
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
