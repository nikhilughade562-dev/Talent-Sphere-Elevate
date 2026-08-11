import React ,{useState,useContext}from 'react'
import { useNavigate } from "react-router-dom";
import { RecruiterContext } from '../../context/RecruiterContext';
import axiosInstance from '../../api/axios';

const RecruiterLogin = () => {
  const {rtoken,setRtoken}=useContext(RecruiterContext);
  const navigate=useNavigate();
   const[state,setState]=useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    const onSubmitHandler=async(event)=>{
    event.preventDefault();

    try {
      //register new user
      if(state==="Sign Up"){
        const res = await axiosInstance.post("/recruiter/register/", {email,password,name});
        console.log(res)
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("rtoken",res.data.access);
        setRtoken(res.access);
        navigate('/recruiter-dashboard')
      }
      //login existing user
      else{
        const res = await axiosInstance.post("/recruiter/login/", {email,password});
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("rtoken",res.data.access);
        setRtoken(res.access);
        navigate('/recruiter-dashboard')
      }
    } catch (error) {
       console.log(error)
    }
  }


  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {state === "Sign Up" ? "Recruiter Signup" : "Recruiter Login"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {state === "Sign Up" 
              ? "Join us to find the best talent." 
              : "Welcome back! Please enter your details."}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {state === "Sign Up" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                type="text"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
              type="email"
              placeholder="you@company.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 transition duration-150"
          >
            {state === "Sign Up" ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          {state === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setState("Login")}
                className="font-medium text-purple-700 hover:text-purple-600 transition"
              >
                Log in
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => setState("Sign Up")}
                className="font-medium text-purple-700 hover:text-purple-600 transition"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecruiterLogin
