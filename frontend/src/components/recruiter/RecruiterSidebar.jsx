import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaPlusCircle,
  FaBriefcase,
} from "react-icons/fa";

const RecruiterSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/recruiter-dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Add Job",
      path: "/recruiter-addJob",
      icon: <FaPlusCircle />,
    },
    {
      name: "Posted Jobs",
      path: "/recruiter-alljobs",
      icon: <FaBriefcase />,
    },
  ];

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-sm hidden lg:block">
      <div className="py-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 mx-3 my-2 px-4 py-3 rounded-xl font-medium transition-all duration-300
              ${
                isActive
                  ? "bg-purple-700 text-white shadow-md"
                  : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default RecruiterSidebar;