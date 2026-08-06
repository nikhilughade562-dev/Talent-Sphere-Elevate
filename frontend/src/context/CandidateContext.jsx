import { createContext, useState } from "react";
import axiosInstance from '../api/axios'

export const CandidateContext = createContext();

const CandidateContextProvider = (props) => {
  const[ctoken,setCtoken]=useState(localStorage.getItem("ctoken") ? localStorage.getItem("ctoken") : "");
  const[jobs,setJobs]=useState([]);

  const [profile, setProfile] = useState({});

  const getProfileData = async () => {
    try {
      const response=await axiosInstance.get("/profile/");
    setProfile(response.data);
    } catch (error) {
      console.log(error.response?.data);
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


  const getJobs = async () => {
    try {
      const response = await axiosInstance.get("/jobs/");
      setJobs(response.data)
    } catch (error) {
      console.log(error)
    }
  };
  

  const value = {
    ctoken,setCtoken,jobs,setJobs,getJobs,profile, setProfile,getProfileData,updateProfile
  };

     return (
    <CandidateContext.Provider value={value}>
      {props.children}
    </CandidateContext.Provider>
  );
};

export default CandidateContextProvider;