import React from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <h3 className='font-bold text-2xl text-purple-800' onClick={() => navigate("/")}>TALENT SPHERE ELEVATE</h3>

      <div className='flex gap-5'>
        <button onClick={()=> navigate("/recruiter-login")} className='bg-purple-900 text-white font-bold px-3 py-1.5 rounded-xl'>Recruiter Login</button>
        <button onClick={()=> navigate("/candidate-login")} className='bg-purple-900 text-white font-bold px-3 py-1.5 rounded-xl'>Candidate Login</button>
      </div>
    </div>
  )
}

export default Navbar
