import React from 'react'
import { useNavigate } from "react-router-dom";
import bg from '../assets/gradientBackground.png'

const HeroSection = () => {
  return (
    <section style={{ backgroundImage: `url(${bg})`}} className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen">
      
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-tight text-slate-800">
          Effortless job matching <br />
          with<span className="text-primary">AI-powered intelligent ATS</span>
        </h1>

        <p className="mt-5 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto text-gray-600 max-sm:text-xs">
        Our intelligent system automatically tailors your resume to perfect job openings, ensuring your application highlights the skills employers want.
        </p>
      </div>
    </section>
  );
};

export default HeroSection
