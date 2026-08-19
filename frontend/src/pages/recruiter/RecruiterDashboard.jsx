import React, { useContext, useEffect, useMemo } from "react";
import { RecruiterContext } from "../../context/RecruiterContext";
import StatCard from "../../components/recruiter/StatCard";
import JobPostingChart from "../../components/recruiter/JobPostingChart";
import {
  FaBriefcase,
  FaClipboardList,
  FaUsers,
  FaUserCheck,
} from "react-icons/fa";

const RecruiterDashboard = () => {
  const { jobs, getAllJobs, rtoken,applicationStats,  getApplicationStats } = useContext(RecruiterContext);

  useEffect(() => {
    if (rtoken) {
      getAllJobs();
      getApplicationStats();
    }
  }, [rtoken]);

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter((job) => job.status === "active").length;

  const totalApplications = applicationStats.total_applications;
const totalSelected = applicationStats.selected_applications;

  const monthlyJobPostings = useMemo(() => {
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
      if (!job.created_at) {
        return;
      }

      const date = new Date(job.created_at);

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>

        <p className="text-gray-500">Welcome back!</p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Jobs"
          value={totalJobs}
          icon={<FaBriefcase />}
          color="bg-purple-600"
        />

        <StatCard
          title="Active Jobs"
          value={activeJobs}
          icon={<FaClipboardList />}
          color="bg-blue-600"
        />

        <StatCard
          title="Applications"
          value={totalApplications}
          icon={<FaUsers />}
          color="bg-green-600"
        />

        <StatCard
          title="Selected"
          value={totalSelected}
          icon={<FaUserCheck />}
          color="bg-orange-500"
        />
      </div>

      {/* Job Posting Graph */}

      <JobPostingChart data={monthlyJobPostings} />

      {/* Recent Jobs */}

      <div className="bg-white rounded-2xl shadow border">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Recent Jobs</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Title</th>

              <th className="text-left p-4">Applications</th>

              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {jobs.slice(0, 5).map((job) => (
              <tr key={job.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{job.title}</td>

                <td className="p-4">{job.applications}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : job.status === "Closed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
