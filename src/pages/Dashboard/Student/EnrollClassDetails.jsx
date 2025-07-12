import { useParams } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import Rating from 'react-rating';

const EnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axiosSecure.get(`/assignments?classId=${id}`)
      .then(res => setAssignments(res.data));
  }, [id, axiosSecure]);

  const handleSubmitAssignment = (assignmentId) => {
    axiosSecure.post('/submissions', { assignmentId, email: user.email })
      .then(() => {
        setAssignments(prev =>
          prev.map(a => a._id === assignmentId ? { ...a, submitted: true } : a)
        );
      });
  };

  const handleSendFeedback = () => {
    axiosSecure.post('/teaching-feedbacks', {
      classId: id,
      email: user.email,
      rating,
      description: feedback,
    }).then(() => {
      setShowModal(false);
      setFeedback('');
      setRating(0);
    });
  };

  return (
    <div className="p-4">
      {/* TER Button */}
      <button onClick={() => setShowModal(true)} className="mb-4 bg-purple-600 text-white px-4 py-2 rounded">
        Teaching Evaluation Report
      </button>

      {/* Assignment Table */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a._id} className="text-center border">
              <td>{a.title}</td>
              <td>{a.description}</td>
              <td>{a.deadline}</td>
              <td>
                <input placeholder="Your link/file" className="border px-2" />
                <button
                  disabled={a.submitted}
                  onClick={() => handleSubmitAssignment(a._id)}
                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {a.submitted ? 'Submitted' : 'Submit'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-semibold mb-2">Teaching Evaluation Report</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border p-2 mb-3"
              placeholder="Write feedback..."
            />
            <div className="mb-3">
              <p>Rating:</p>
              <Rating
                initialRating={rating}
                onChange={(r) => setRating(r)}
                emptySymbol="☆"
                fullSymbol="★"
                className="text-yellow-500"
              />
            </div>
            <button onClick={handleSendFeedback} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Send
            </button>
            <button onClick={() => setShowModal(false)} className="text-gray-500">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollClassDetails;
