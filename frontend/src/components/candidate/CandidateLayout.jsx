import React from "react";
import { Outlet } from "react-router-dom";
import CandidateNavbar from "./CandidateNavbar";

const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <CandidateNavbar />

      <main className="pt-20 px-4 md:px-8 lg:px-12">
        <Outlet />
      </main>
    </div>
  );
};

export default CandidateLayout;