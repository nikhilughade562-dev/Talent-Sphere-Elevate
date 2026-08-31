import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CandidateContext } from '../../context/CandidateContext';
import axiosInstance from '../../api/axios'

const CandidateLogin = () => {
  const navigate = useNavigate();
  const { ctoken, setCtoken } = useContext(CandidateContext)
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  React.useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else if (cooldown === 0 && isBlocked) {
      setIsBlocked(false);
      setErrorMessage("");
    }
    return () => clearInterval(timer);
  }, [cooldown, isBlocked]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      //register new user
      if (state === "Sign Up") {
        const res = await axiosInstance.post("/user/register/", { email, password, name });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh || res.data.access);
        localStorage.setItem("ctoken", res.data.access);
        setCtoken(res.data.access)
        navigate('/candidate-dashboard')

      }
      //login existing user
      else {
        const res = await axiosInstance.post("/user/login/", { email, password });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh || res.data.access);
        localStorage.setItem("ctoken", res.data.access);
        setCtoken(res.data.access)
        navigate('/candidate-dashboard')
      }
    } catch (error) {
      // Removed console.log(error) to prevent leaking sensitive info in browser logs
      if (error.response?.status === 429) {
        setErrorMessage("Too many requests. Please wait a few seconds and try again.");
        setIsBlocked(true);
        setCooldown(10);
      } else if (state === "Sign Up") {
        setErrorMessage("Email already registered. Please log in.");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    }
  }


  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {state === "Sign Up" ? "Candidate Signup" : "Candidate Login"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {state === "Sign Up"
              ? "Create an account to land your dream job."
              : "Welcome back! Enter your details to access jobs."}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center border border-red-100">
            {errorMessage}
          </div>
        )}

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
              placeholder="you@example.com"
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
            disabled={isBlocked}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white transition duration-150 ${isBlocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600'}`}
          >
            {isBlocked ? `Try again in ${cooldown}s` : (state === "Sign Up" ? "Create Account" : "Sign In")}
          </button>
        </form>

        <div className="mt-6 text-center">
          {state === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setState("Login"); setErrorMessage(""); }}
                className="font-medium text-purple-700 hover:text-purple-600 transition"
              >
                Log in
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => { setState("Sign Up"); setErrorMessage(""); }}
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

export default CandidateLogin
