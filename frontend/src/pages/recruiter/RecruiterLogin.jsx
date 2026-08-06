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
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="mt-40 flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-800 text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-700 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-700 underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default RecruiterLogin
