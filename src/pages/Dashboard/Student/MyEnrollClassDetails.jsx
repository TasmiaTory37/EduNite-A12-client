import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Rating from "react-rating";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import usePagination from "../../../Hook/usePagination";
import Pagination from "../../../components/Pagination";

const MyEnrollClassDetails = () => {
   useEffect(() => {
            document.title = "EduNite | My Enroll Class Details"; 
          }, []);
  const { id } = useParams(); // classId
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);
  const [submissionValues, setSubmissionValues] = useState({});
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [showTERModal, setShowTERModal] = useState(false);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axiosSecure.get(`/assignments/${id}`).then((res) => setAssignments(res.data));

    // OPTIONAL: preload submitted assignments from server (if supported)
    axiosSecure
      .get(`/submitted-assignment-ids/${id}?email=${user.email}`)
      .then((res) => setSubmittedAssignments(res.data || []))
      .catch(() => setSubmittedAssignments([]));
  }, [id, axiosSecure, user]);

  const handleInputChange = (assignmentId, value) => {
    setSubmissionValues((prev) => ({ ...prev, [assignmentId]: value }));
  };

  const handleSubmit = async (assignmentId) => {
    const value = submissionValues[assignmentId];
    if (!value) {
      return Swal.fire("Empty", "Please enter or paste your answer link.", "warning");
    }

    try {
      await axiosSecure.post(`/submit-assignment/${assignmentId}`, {
        answerUrl: value,
        classId: id,
      });
      Swal.fire("Submitted!", "Your assignment has been submitted.", "success");

      // Clear input and mark as submitted
      setSubmissionValues((prev) => ({ ...prev, [assignmentId]: "" }));
      setSubmittedAssignments((prev) => [...prev, assignmentId]);
    } catch (error) {
      Swal.fire("Error", "Submission failed. Try again.", "error");
    }
  };

  const handleFeedback = () => {
    if (!description || rating === 0) {
      return Swal.fire("Missing Info", "Write feedback and rate the class.", "warning");
    }

    axiosSecure
      .post("/feedback", {
        classId: id,
        description,
        rating,
        userName: user?.displayName || "Anonymous",
        userImage: user?.photoURL || "",
      })
      .then(() => {
        Swal.fire("Thank you!", "Your feedback has been submitted.", "success");
        setDescription("");
        setRating(0);
        setShowTERModal(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to submit feedback.", "error");
      });
  };

  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(assignments, 10);

  return (
    <div className="p-6 space-y-8">
      {/* TER Button */}
      <div className="mb-4">
        <button onClick={() => setShowTERModal(true)} className="btn btn-info">
          Teaching Evaluation Report (TER)
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Assignments</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Deadline</th>
            <th className="p-2">Submit</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((a) => (
            <tr key={a._id} className="border-b">
              <td className="p-2">{a.title}</td>
              <td className="p-2">{a.description}</td>
              <td className="p-2">{new Date(a.deadline).toLocaleDateString()}</td>
              <td className="p-2">
                <input
                  placeholder="Paste URL or Answer"
                  className="input input-bordered w-64"
                  value={submissionValues[a._id] || ""}
                  onChange={(e) => handleInputChange(a._id, e.target.value)}
                  disabled={submittedAssignments.includes(a._id)}
                />
                <button
                  onClick={() => handleSubmit(a._id)}
                  className="btn btn-sm btn-success ml-2 mt-2"
                  disabled={submittedAssignments.includes(a._id)}
                >
                  {submittedAssignments.includes(a._id) ? "Submitted" : "Submit"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />

      {/* TER Modal */}
      {showTERModal && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg space-y-4 shadow">
            <h3 className="text-lg font-bold">Teaching Evaluation Report (TER)</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Write your feedback"
            ></textarea>
            <div className="my-2">
              <Rating
                initialRating={rating}
                onChange={setRating}
                emptySymbol={<span className="text-gray-400 text-2xl">☆</span>}
                fullSymbol={<span className="text-yellow-400 text-2xl">★</span>}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button className="btn" onClick={() => setShowTERModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleFeedback}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;