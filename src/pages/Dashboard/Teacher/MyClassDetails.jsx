import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const MyClassDetails = () => {
  const { id } = useParams(); // classId
  const axiosSecure = useAxiosSecure();
  const [assignments, setAssignments] = useState([]);
  const [enrollCount, setEnrollCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/assignments/${id}`);
        setAssignments(res.data);

        const classRes = await axiosSecure.get(`/classes/${id}`);
        setEnrollCount(classRes.data.enrollCount || 0);

        const subRes = await axiosSecure.get(`/submissions/count/${id}`);
        setSubmissionCount(subRes.data.count || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id, axiosSecure]);

  // Handle Add Assignment
  const handleAddAssignment = async () => {
    const assignmentData = {
      ...formData,
      classId: id
    };

    try {
      const res = await axiosSecure.post('/assignments', assignmentData);
      console.log("Assignment Created:", res.data);

      setShowModal(false);
      Swal.fire('Success!', 'Assignment created successfully.', 'success');
      setFormData({ title: '', description: '', deadline: '' });

      const updated = await axiosSecure.get(`/assignments/${id}`);
      setAssignments(updated.data);
    } catch (err) {
      console.error("Assignment Error:", err.response?.data || err.message);
      Swal.fire('Error', 'Failed to create assignment.', 'error');
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-100 p-6 rounded shadow">
          <h3 className="text-xl font-bold">Total Enrollments</h3>
          <p className="text-3xl ">{enrollCount}</p>
        </div>
        <div className="bg-green-100 p-6 rounded shadow">
          <h3 className="text-xl font-bold">Total Assignments</h3>
          <p className="text-3xl ">{assignments.length}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded shadow">
          <h3 className="text-xl font-bold">Total Submissions</h3>
          <p className="text-3xl ">{submissionCount}</p>
        </div>
      </div>

      {/* Assignment Table */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">Create Assignment</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td>{a.title}</td>
                <td>{a.description}</td>
                <td>{new Date(a.deadline).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md space-y-4 shadow-lg">
            <h3 className="text-lg font-bold">Add Assignment</h3>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
              type="date"
              className="input input-bordered w-full"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="btn">Cancel</button>
              <button onClick={handleAddAssignment} className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClassDetails;
