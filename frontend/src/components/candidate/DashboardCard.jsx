import React from "react";

const DashboardCard = ({
  title,
  value,
  icon,
  description,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            {value}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {description}
          </p>
        </div>

        <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;