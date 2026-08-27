import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const JobPostingChart = ({ jobs = [] }) => {
  const [view, setView] = useState("monthly");

  /*
   Create a list of months/years that exist in the jobs data.
   */
  const availableMonths = useMemo(() => {
    const monthMap = new Map();

    jobs.forEach((job) => {
      if (!job.created_at) return;

      const date = new Date(job.created_at);

      if (isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const month = date.getMonth();

      const key = `${year}-${String(month).padStart(2, "0")}`;

      if (!monthMap.has(key)) {
        monthMap.set(key, {
          year,
          month,
          label: date.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          }),
        });
      }
    });

    return Array.from(monthMap.values()).sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }

      return b.month - a.month;
    });
  }, [jobs]);

  const [selectedMonth, setSelectedMonth] = useState("");

  React.useEffect(() => {
    if (availableMonths.length > 0 && !selectedMonth) {
      const latest = availableMonths[0];

      setSelectedMonth(
        `${latest.year}-${String(latest.month).padStart(2, "0")}`
      );
    }
  }, [availableMonths, selectedMonth]);

  const monthlyData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthMap = {};

    months.forEach((month) => {
      monthMap[month] = 0;
    });

    jobs.forEach((job) => {
      if (!job.created_at) return;

      const date = new Date(job.created_at);

      if (isNaN(date.getTime())) return;

      const month = date.toLocaleString("en-US", {
        month: "short",
      });

      monthMap[month] += 1;
    });

    return months.map((month) => ({
      month,
      jobs: monthMap[month],
    }));
  }, [jobs]);

  
  const getMonday = (date) => {
    const result = new Date(date);

    const day = result.getDay();

    // Sunday = 0, Monday = 1
    const difference = day === 0 ? -6 : 1 - day;

    result.setDate(result.getDate() + difference);

    result.setHours(0, 0, 0, 0);

    return result;
  };

  const weeklyData = useMemo(() => {
    if (!selectedMonth) {
      return [];
    }

    const [year, month] = selectedMonth.split("-").map(Number);

    const firstDayOfMonth = new Date(year, month, 1);

    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstMonday = getMonday(firstDayOfMonth);

    const lastMonday = getMonday(lastDayOfMonth);

    const weeks = [];

    let currentMonday = new Date(firstMonday);

    let weekNumber = 1;

    while (currentMonday <= lastMonday) {
      const currentSunday = new Date(currentMonday);

      currentSunday.setDate(currentSunday.getDate() + 6);
      currentSunday.setHours(23, 59, 59, 999);

      const jobCount = jobs.filter((job) => {
        if (!job.created_at) return false;

        const jobDate = new Date(job.created_at);

        if (isNaN(jobDate.getTime())) return false;

        if (
          jobDate.getFullYear() !== year ||
          jobDate.getMonth() !== month
        ) {
          return false;
        }

        return (
          jobDate >= currentMonday &&
          jobDate <= currentSunday
        );
      }).length;

      weeks.push({
        week: `Week ${weekNumber}`,
        jobs: jobCount,
        startDate: currentMonday.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        endDate: currentSunday.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });

      currentMonday.setDate(currentMonday.getDate() + 7);

      weekNumber++;
    }

    return weeks;
  }, [jobs, selectedMonth]);

  const chartData =
    view === "monthly" ? monthlyData : weeklyData;

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Job Posting Activity
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {view === "monthly"
              ? "Number of jobs posted each month"
              : "Number of jobs posted each week"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* View Dropdown */}
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="monthly">
              Monthly
            </option>

            <option value="weekly">
              Weekly
            </option>
          </select>

          {/* Month Dropdown */}
          {view === "weekly" && (
            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {availableMonths.length === 0 ? (
                <option value="">
                  No months available
                </option>
              ) : (
                availableMonths.map((item) => {
                  const value = `${item.year}-${String(
                    item.month
                  ).padStart(2, "0")}`;

                  return (
                    <option key={value} value={value}>
                      {item.label}
                    </option>
                  );
                })
              )}
            </select>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey={
                view === "monthly"
                  ? "month"
                  : "week"
              }
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value) => [
                value,
                "Jobs",
              ]}
              labelFormatter={(label, payload) => {
                if (
                  view === "weekly" &&
                  payload &&
                  payload.length > 0
                ) {
                  const item = payload[0].payload;

                  return `${label} (${item.startDate} - ${item.endDate})`;
                }

                return label;
              }}
            />

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