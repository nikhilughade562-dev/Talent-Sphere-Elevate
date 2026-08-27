import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import {
  FaLightbulb,
  FaRoute,
  FaSyncAlt,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";

const LearningPath = () => {
  const [learningPath, setLearningPath] = useState(null);

  const [targetRole, setTargetRole] = useState("");
  const [careerGoal, setCareerGoal] = useState("");

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch Existing Learning Path

  const fetchLearningPath = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/user/learning-path/");

      if (res.data.exists) {
        setLearningPath(res.data.learning_path);

        setTargetRole(
          res.data.learning_path.target_role || ""
        );

        setCareerGoal(
          res.data.learning_path.career_goal || ""
        );
      } else {
        setLearningPath(null);
        setShowForm(true);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load your learning path"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningPath();
  }, []);

  // Generate / Update

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!targetRole.trim()) {
      toast.error("Please enter your target role");
      return;
    }

    if (!careerGoal.trim()) {
      toast.error("Please enter your career goal");
      return;
    }

    try {
      setGenerating(true);

      const res = await axiosInstance.post(
        "/user/learning-path/",
        {
          target_role: targetRole,
          career_goal: careerGoal,
        }
      );

      setLearningPath(
        res.data.learning_path
      );

      setShowForm(false);

      toast.success(
        "Learning path generated successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
          "Failed to generate learning path"
      );
    } finally {
      setGenerating(false);
    }
  };

  // Loading


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-purple-700 font-semibold">
          Loading your learning path...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* PAGE HEADER*/}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Learning Path
          </h1>

          <p className="text-gray-500 mt-1">
            Your personalized roadmap for career growth
          </p>
        </div>

        {learningPath && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-5 py-3 rounded-xl transition duration-300 shadow-sm"
          >
            <FaSyncAlt />
            Update Learning Path
          </button>
        )}
      </div>

      {/* GENERATE FORM */}

      {showForm && (
        <div className="bg-white rounded-2xl border border-purple-100 shadow-md p-6 md:p-8 mb-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
              <FaGraduationCap className="text-purple-700 text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {learningPath
                  ? "Update Your Learning Path"
                  : "Build Your Learning Path"}
              </h2>

              <p className="text-sm text-gray-500">
                Tell us about your career direction
              </p>
            </div>

          </div>

          <form onSubmit={handleGenerate}>

            {/* Target Role */}

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Role
              </label>

              <input
                type="text"
                value={targetRole}
                onChange={(e) =>
                  setTargetRole(e.target.value)
                }
                placeholder="e.g. Full Stack Developer"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />

            </div>

            {/* Career Goal */}

            <div className="mb-6">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Career Goal
              </label>

              <textarea
                value={careerGoal}
                onChange={(e) =>
                  setCareerGoal(e.target.value)
                }
                rows="4"
                placeholder="e.g. I want to become job-ready for a software engineering role."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
              />

            </div>

            <div className="flex gap-3 justify-end">

              {learningPath && (
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={generating}
                className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 disabled:bg-purple-400 text-white font-semibold px-6 py-3 rounded-xl transition duration-300"
              >
                {generating ? (
                  <>
                    <FaSyncAlt className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FaRoute />
                    {learningPath
                      ? "Generate New Path"
                      : "Generate Learning Path"}
                  </>
                )}
              </button>

            </div>

          </form>
        </div>
      )}

      {/*ROADMAP*/}

      {learningPath && !showForm && (
        <>
          {/* Target information */}

          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 mb-6">

            <div className="grid sm:grid-cols-2 gap-5">

              <div>
                <p className="text-xs uppercase tracking-wider text-purple-600 font-semibold mb-1">
                  Target Role
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {learningPath.target_role}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-purple-600 font-semibold mb-1">
                  Career Goal
                </p>

                <p className="text-gray-700">
                  {learningPath.career_goal}
                </p>
              </div>

            </div>

          </div>

          {/* Side-by-side section */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/*ROADMAP*/}

            <div className="lg:col-span-2 bg-white rounded-2xl border border-purple-100 shadow-md p-6 md:p-8">

              <div className="flex items-center gap-3 mb-7">

                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FaRoute className="text-purple-700 text-xl" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Your Learning Roadmap
                  </h2>

                  <p className="text-sm text-gray-500">
                    Recommended learning sequence
                  </p>
                </div>

              </div>

              <div className="space-y-0">

                {learningPath.roadmap?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start group"
                    >

                      {/* Number */}

                      <div className="flex flex-col items-center mr-4">

                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-purple-700 group-hover:text-white transition">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </div>

                        {index !==
                          learningPath.roadmap.length -
                            1 && (
                          <div className="w-px h-10 bg-purple-200" />
                        )}

                      </div>

                      {/* Topic */}

                      <div className="pt-2 pb-5">

                        <p className="font-semibold text-gray-800">
                          {item}
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

            {/*  RECOMMENDATION */}

            <div className="bg-white rounded-2xl border border-purple-100 shadow-md p-6 md:p-8 h-fit">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FaLightbulb className="text-purple-700 text-xl" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    AI Recommendation
                  </h2>

                  <p className="text-sm text-gray-500">
                    Personalized suggestion
                  </p>
                </div>

              </div>

              <div className="bg-purple-50 rounded-xl p-5">

                <p className="text-gray-700 leading-7 text-sm">
                  {learningPath.recommendation}
                </p>

              </div>

              <div className="flex items-center gap-2 mt-5 text-purple-700 text-sm font-semibold">
                <FaArrowRight />
                Follow the roadmap consistently
              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default LearningPath;