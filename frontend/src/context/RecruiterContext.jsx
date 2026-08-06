import { createContext, useState } from "react";
import axiosInstance from "../api/axios";

export const RecruiterContext = createContext();

const RecruiterContextProvider = (props) => {
  const[rtoken,setRtoken]=useState(localStorage.getItem("rtoken") ? localStorage.getItem("rtoken") : "");
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState({});

  const getProfileData = async () => {
    try {
      const response=await axiosInstance.get("/profile");
      setProfile(response.data);
    } catch (error) {
      console.log(error.response?.data);
      return false;
    }
    
  };

  const updateProfile = async () => {
  try {
    const response = await axiosInstance.put("/profile/", profile);
    setProfile(response.data.user);
    return true;
  } catch (error) {
    console.log(error.response?.data);
    return false;
  }
};

  const getAllJobs = async () => {
    const response = await axiosInstance.get("/jobs/recruiter/jobs/list/")
    setJobs(response.data)
  };

  const value = {
    rtoken,setRtoken,profile,setProfile,getProfileData,jobs, setJobs,getAllJobs,updateProfile
  };

     return (
    <RecruiterContext.Provider value={value}>
      {props.children}
    </RecruiterContext.Provider>
  );
};

export default RecruiterContextProvider;