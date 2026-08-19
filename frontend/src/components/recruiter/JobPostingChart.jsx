import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const JobPostingChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Job Posting Activity
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Number of jobs posted each month
        </p>
      </div>

      <div className="w-full h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="jobs"
              stroke="#7e22ce"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default JobPostingChart;