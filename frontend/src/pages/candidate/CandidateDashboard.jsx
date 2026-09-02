import React, { useContext, useEffect, useMemo } from "react";
import {
  FaBriefcase,
  FaUserCheck,
  FaComments,
} from "react-icons/fa";

import { CandidateContext } from "../../context/CandidateContext";

import DashboardCard from "../../components/candidate/DashboardCard";
import ApplicationChart from "../../components/candidate/ApplicationChart";

const CandidateDashboard = () => {
  const {
    appliedJobs,
    appliedJobsList
  } = useContext(CandidateContext);

  useEffect(() => {
    appliedJobsList();
  }, []);

  const totalApplied = appliedJobs.length;

  const shortlisted = appliedJobs.filter(
    (application) =>
      application.status?.toLowerCase() === "shortlisted"
  ).length;

  const interview = appliedJobs.filter(
    (application) =>
      application.status?.toLowerCase() === "interview"
  ).length;

  const monthlyApplications = useMemo(() => {
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

    appliedJobs.forEach((application) => {
      if (!application.applied_at) {
        return;
      }

      const date = new Date(application.applied_at);

      const month = date.toLocaleString("en-US", {
        month: "short",
      });

      monthMap[month] += 1;
    });

    return months.map((month) => ({
      month,
      applications: monthMap[month],
    }));
  }, [appliedJobs]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Candidate Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Track your job applications and recruitment progress.
        </p>

      </div>

      {/* Statistic Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <DashboardCard
          title="Jobs Applied"
          value={totalApplied}
          icon={<FaBriefcase />}
          description="Total applications submitted"
        />

        <DashboardCard
          title="Shortlisted"
          value={shortlisted}
          icon={<FaUserCheck />}
          description="Applications shortlisted"
        />

        <DashboardCard
          title="Interview"
          value={interview}
          icon={<FaComments />}
          description="Applications in interview"
        />

      </div>

      {/* Application Chart */}

      <ApplicationChart
        data={monthlyApplications}
      />

    </div>
  );
};

export default CandidateDashboard;