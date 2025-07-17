import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import usePagination from "../../../Hook/usePagination";
import Pagination from "../../../components/Pagination";

const ClassProgress = () => {
   useEffect(() => {
            document.title = "EduNite | Class Progress"; 
          }, []);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [enrollCount, setEnrollCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/classes/${id}`).then((res) => {
      setEnrollCount(res.data.enrollCount || 0);
    });

    axiosSecure.get(`/assignments/${id}`).then((res) => {
      setAssignments(res.data);
      setAssignmentCount(res.data.length);
    });

    axiosSecure.get(`/submissions/count/${id}`).then((res) => {
      setSubmissionCount(res.data.count);
    });
  }, [id, axiosSecure]);

  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage
  } = usePagination(assignments, 10);

  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Class Progress Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-100 p-6 rounded shadow border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 mb-1">Total Enrollments</h4>
          <p className="text-2xl font-bold">{enrollCount}</p>
        </div>

        <div className="bg-green-100 p-6 rounded shadow border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 mb-1">Total Assignments</h4>
          <p className="text-2xl font-bold">{assignmentCount}</p>
        </div>

        <div className="bg-purple-100 p-6 rounded shadow border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 mb-1">Total Submissions</h4>
          <p className="text-2xl font-bold">{submissionCount}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Assignment List
        </h3>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Deadline</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {paginatedData.map((a) => (
                  <tr key={a._id} className="border-t">
                    <td className="p-3 font-medium">{a.title}</td>
                    <td className="p-3">{a.description}</td>
                    <td className="p-3">
                      {new Date(a.deadline).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassProgress;
