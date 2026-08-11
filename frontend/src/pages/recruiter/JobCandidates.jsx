import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RecruiterContext } from '../../context/RecruiterContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaUserCircle } from 'react-icons/fa';

const JobCandidates = () => {
    const { id } = useParams();
    const { rtoken } = useContext(RecruiterContext);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCandidates = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/jobs/recruiter/jobs/${id}/candidates/`, {
                headers: { Authorization: `Bearer ${rtoken}` }
            });
            setCandidates(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load candidates");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (rtoken) {
            fetchCandidates();
        }
    }, [rtoken, id]);

    const updateStatus = async (appId, status) => {
        try {
            await axios.put(`http://localhost:8000/api/jobs/recruiter/applications/${appId}/status/`, { status: status }, {
                headers: { Authorization: `Bearer ${rtoken}` }
            });
            toast.success("Status updated");
            fetchCandidates();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    if (loading) return <div className="text-center mt-20">Loading candidates...</div>;

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link to="/recruiter-alljobs" className="text-gray-500 hover:text-purple-700">
                    <FaArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold">Candidates (ATS)</h1>
            </div>

            <div className="bg-white rounded-2xl shadow border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-5 py-4 text-left">Rank</th>
                                <th className="px-5 py-4 text-left">Candidate</th>
                                <th className="px-5 py-4 text-left">Match Score</th>
                                <th className="px-5 py-4 text-left">Experience</th>
                                <th className="px-5 py-4 text-left">Skills Info</th>
                                <th className="px-5 py-4 text-left">Status</th>
                                <th className="px-5 py-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-8 text-gray-500">No candidates applied yet.</td></tr>
                            ) : candidates.map((app, index) => (
                                <tr key={app.id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 font-bold text-xl text-purple-700">#{index + 1}</td>
                                    <td className="px-5 py-4">
                                        <div className="font-semibold flex items-center gap-2">
                                            <FaUserCircle className="text-gray-400" size={24} />
                                            {app.candidate_name}
                                        </div>
                                        <div className="text-sm text-gray-500">{app.candidate_email}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="font-bold text-lg text-green-600">{app.overall_score}%</div>
                                        <div className="text-xs text-gray-500">Skills: {app.skill_score}%</div>
                                    </td>
                                    <td className="px-5 py-4">{app.candidate_experience || 'N/A'} yrs</td>
                                    <td className="px-5 py-4 max-w-xs">
                                        <div className="text-sm">
                                            <strong className="text-green-600">Matched:</strong> {app.matched_skills?.join(', ') || 'None'}
                                        </div>
                                        <div className="text-sm mt-1">
                                            <strong className="text-red-500">Missing:</strong> {app.missing_skills?.join(', ') || 'None'}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${app.status === 'applied' ? 'bg-blue-100 text-blue-700' : app.status === 'shortlisted' ? 'bg-green-100 text-green-700' : app.status === 'interview' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'}`}>
                                            {app.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col gap-2">
                                            {app.status === 'applied' && (
                                                <button onClick={() => updateStatus(app.id, 'shortlisted')} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition">Shortlist</button>
                                            )}
                                            {app.status === 'shortlisted' && (
                                                <button onClick={() => updateStatus(app.id, 'interview')} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition">Interview</button>
                                            )}
                                            {app.status !== 'rejected' && (
                                                <button onClick={() => updateStatus(app.id, 'rejected')} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition">Reject</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default JobCandidates;
