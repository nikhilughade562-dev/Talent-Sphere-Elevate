import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterNavbar from "./RecruiterNavbar";
import RecruiterSidebar from "./RecruiterSidebar";

const RecruiterLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <RecruiterNavbar />

      {/* Sidebar + Page Content */}
      <div className="flex">
        <RecruiterSidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 mt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;