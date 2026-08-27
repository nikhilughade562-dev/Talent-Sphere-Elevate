import React, { useContext } from 'react'
import { Route, Routes,Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecruiterContext } from './context/RecruiterContext';
import { CandidateContext } from './context/CandidateContext';
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import RecruiterLogin from './pages/recruiter/RecruiterLogin'
import RecruiterProfile from './pages/recruiter/RecruiterProfile'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import AllJobs from './pages/recruiter/AllJobs'
import AddJob from './pages/recruiter/AddJob'
import JobCandidates from './pages/recruiter/JobCandidates'
import CandidateLogin from './pages/candidate/CandidateLogin'
import CandidateProfile from './pages/candidate/CandidateProfile'
import Jobs from './pages/candidate/Jobs'
import AppliedJobs from './pages/candidate/AppliedJobs'
import RecruiterLayout from "./components/recruiter/RecruiterLayout";
import CandidateLayout from "./components/candidate/CandidateLayout";
import JobDetails from "./pages/candidate/JobDetails";
import RecruiterInterviews from "./pages/recruiter/RecruiterInterviews";
import CandidateInterviews from "./pages/candidate/CandidateInterviews";
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import LearningPath from "./pages/candidate/LearningPath";

const App = () => {
  const {rtoken}=useContext(RecruiterContext);
  const {ctoken}=useContext(CandidateContext);

// If either recruiter or candidate is logged in
  const isLoggedIn = rtoken || ctoken;

  return (
    <>
      {/* Show Navbar only when NOT logged in */}
      {!isLoggedIn && <Navbar />}

      <Routes>
        {/* ===================== PUBLIC ROUTES ===================== */}

        <Route
          path="/"
          element={
            isLoggedIn ? (
              rtoken ? (
                <Navigate to="/recruiter-dashboard" replace />
              ) : (
                <Navigate to="/candidate-jobs" replace />
              )
            ) : (
              <HeroSection />
            )
          }
        />

        <Route
          path="/recruiter-login"
          element={
            rtoken ? (
              <Navigate to="/recruiter-dashboard" replace />
            ) : (
              <RecruiterLogin />
            )
          }
        />

        <Route
          path="/candidate-login"
          element={
            ctoken ? (
              <Navigate to="/candidate-jobs" replace />
            ) : (
              <CandidateLogin />
            )
          }
        />

        {/* ===================== RECRUITER ROUTES ===================== */}

        <Route
  element={
    rtoken!="" ? (
      <RecruiterLayout />
    ) : (
      <Navigate to="/recruiter-login" replace />
    )
  }
>
  <Route
    path="/recruiter-dashboard"
    element={<RecruiterDashboard />}
  />

  <Route
    path="/recruiter-profile"
    element={<RecruiterProfile />}
  />

  <Route
    path="/recruiter-addJob"
    element={<AddJob />}
  />

  <Route
    path="/recruiter-alljobs"
    element={<AllJobs />}
  />

  <Route
    path="/recruiter-jobs/:id/candidates"
    element={<JobCandidates />}
  />

  <Route
    path="/recruiter-interviews"
    element={<RecruiterInterviews />}
  />
</Route>

        {/* ===================== CANDIDATE ROUTES ===================== */}

        <Route
  element={
    ctoken!="" ? (
      <CandidateLayout />
    ) : (
      <Navigate to="/candidate-login" replace />
    )
  }
>
  <Route
    path="/candidate-jobs"
    element={<Jobs />}
  />

  <Route
  path="/candidate-dashboard"
  element={<CandidateDashboard />}
/>

  <Route
    path="/candidate-job/:id"
    element={<JobDetails />}
  />

  <Route
    path="/candidate-applied-jobs"
    element={<AppliedJobs />}
  />

  <Route
    path="/candidate-profile"
    element={<CandidateProfile />}
  />

  <Route
    path="/candidate-interviews"
    element={<CandidateInterviews />}
  />

  <Route
  path="/candidate-learning-path"
  element={<LearningPath />}
/>

</Route>

        {/* ===================== 404 ===================== */}

        <Route
          path="*"
          element={
            isLoggedIn ? (
              rtoken ? (
                <Navigate to="/recruiter-dashboard" replace />
              ) : (
                <Navigate to="/candidate-jobs" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App
