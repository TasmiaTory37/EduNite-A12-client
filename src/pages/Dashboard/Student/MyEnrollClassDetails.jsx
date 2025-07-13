import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Rating from "react-rating";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axiosSecure.get(`/assignments/${id}`).then((res) => setAssignments(res.data));
  }, [id, axiosSecure]);

  const handleSubmit = (assignmentId, value) => {
    axiosSecure
      .post(`/submit-assignment/${assignmentId}`, { value })
      .then(() =>
        Swal.fire({
          title: "Submitted!",
          text: "Your assignment has been submitted.",
          icon: "success",
          confirmButtonText: "Okay",
        })
      );
  };

  const handleFeedback = () => {
    if (!description || rating === 0) {
      return Swal.fire({
        title: "Missing Info!",
        text: "Please write feedback and provide a rating.",
        icon: "warning",
        confirmButtonText: "Got it",
      });
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
        Swal.fire({
          title: "Thank you!",
          text: "Your feedback has been submitted.",
          icon: "success",
          confirmButtonText: "Great!",
        });
        setDescription("");
        setRating(0);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Deadline</th>
            <th className="p-2">Submission</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a._id} className="border-b">
              <td className="p-2">{a.title}</td>
              <td className="p-2">{a.description}</td>
              <td className="p-2">{a.deadline}</td>
              <td className="p-2">
                <input
                  placeholder="Paste URL or Answer"
                  className="input input-bordered"
                />
                <button
                  onClick={() => handleSubmit(a._id, "Your answer")}
                  className="btn btn-sm btn-success ml-2"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Teaching Evaluation Report (TER)</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full mt-2"
          placeholder="Write your feedback"
        ></textarea>
        <div className="my-3">
          <Rating
            initialRating={rating}
            onChange={setRating}
            emptySymbol={<span className="text-gray-400 text-2xl">☆</span>}
            fullSymbol={<span className="text-yellow-400 text-2xl">★</span>}
          />
        </div>
        <button onClick={handleFeedback} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
