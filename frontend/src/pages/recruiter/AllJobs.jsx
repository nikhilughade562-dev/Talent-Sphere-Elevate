import React ,{useEffect,useContext} from 'react'
import { RecruiterContext } from '../../context/RecruiterContext'

const AllJobs = () => {
   const {rtoken,setRtoken,jobs, setJobs,getAllJobs}=useContext(RecruiterContext);
   useEffect(() => {
    if (rtoken) {
      getAllJobs();
    }
  }, [rtoken]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Posted Jobs</h1>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-5 py-4 text-left">Job</th>

                <th className="px-5 py-4 text-left">Company</th>

                <th className="px-5 py-4 text-left">Location</th>

                <th className="px-5 py-4 text-left">Experience</th>

                <th className="px-5 py-4 text-left">Salary</th>

                <th className="px-5 py-4 text-left">Applications</th>

                <th className="px-5 py-4 text-left">Status</th>

                <th className="px-5 py-4 text-left">Created</th>

              </tr>

            </thead>

            <tbody>

              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4 font-semibold">
                    {job.title}
                  </td>

                  <td className="px-5 py-4">
                    {job.company}
                  </td>

                  <td className="px-5 py-4">
                    {job.location}
                  </td>

                  <td className="px-5 py-4">
                    {job.experience_level}
                  </td>

                  <td className="px-5 py-4">
                    ₹{job.salary_min.toLocaleString()} - ₹
                    {job.salary_max.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    {job.applications}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : job.status === "Closed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {job.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">
                    {job.created_at}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default AllJobs
