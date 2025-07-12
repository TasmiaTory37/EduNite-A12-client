import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyEnrollClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/enrolled-classes?email=${user.email}`)
        .then(res => setClasses(res.data));

      axiosSecure.get(`/payments/${user.email}`)
        .then(res => setPayments(res.data));
    }
  }, [axiosSecure, user]);

  return (
    <div className="p-4 space-y-8">
      {/* Enrolled Classes */}
      <h2 className="text-2xl font-bold mb-4">My Enrolled Classes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls._id} className="bg-white rounded shadow p-4">
            <img src={cls.image} alt={cls.title} className="h-40 w-full object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3">{cls.title}</h3>
            <p className="text-sm text-gray-600">By: {cls.name}</p>
            <Link
              to={`/dashboard/my-enroll-class/${cls._id}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Continue
            </Link>
          </div>
        ))}
      </div>

      {/* Payment History */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Payment History</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Class ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">{p.classId}</td>
              <td className="border p-2">${(p.amount / 100).toFixed(2)}</td>
              <td className="border p-2">{p.transactionId}</td>
              <td className="border p-2">{new Date(p.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyEnrollClass;
