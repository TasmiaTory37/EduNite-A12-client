import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import usePagination from "../../../Hook/usePagination";
import Pagination from "../../../components/Pagination";

const MyEnrollClass = () => {
   useEffect(() => {
            document.title = "EduNite | My Enroll Class"; 
          }, []);
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

  // Pagination for enrolled classes
  const {
    paginatedData: paginatedClasses,
    currentPage: classPage,
    totalPages: classTotalPages,
    goToPage: goToClassPage
  } = usePagination(classes, 10); // 10 cards per page

  // Pagination for payment history
  const {
    paginatedData: paginatedPayments,
    currentPage: paymentPage,
    totalPages: paymentTotalPages,
    goToPage: goToPaymentPage
  } = usePagination(payments, 10); // 10 rows per page

  return (
    <div className="p-4 space-y-8">
      {/* Enrolled Classes */}
      <h2 className="text-2xl font-bold mb-4">My Enrolled Classes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {paginatedClasses.map(cls => (
    <div key={cls._id} className="bg-white rounded shadow flex flex-col h-full">
      <img
        src={cls.image}
        alt={cls.title}
        className="h-40 w-full object-cover rounded-t"
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{cls.title}</h3>
          <p className="text-sm text-gray-600">By: {cls.name}</p>
        </div>
          <Link
              to={`/dashboard/my-enroll-class/${cls._id}`}
              className="mt-4 bg-blue-500 text-white px-4 py-2 text-center rounded hover:bg-blue-600"
            >
              Continue
            </Link>
          </div>
        </div>
      ))}
    </div>

      
        <Pagination
          currentPage={classPage}
          totalPages={classTotalPages}
          goToPage={goToClassPage}
        />
     

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
          {paginatedPayments.map(p => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">{p.classId}</td>
              <td className="border p-2">${(p.amount / 100).toFixed(2)}</td>
              <td className="border p-2">{p.transactionId}</td>
              <td className="border p-2">{new Date(p.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
        <Pagination
          currentPage={paymentPage}
          totalPages={paymentTotalPages}
          goToPage={goToPaymentPage}
        />
      
    </div>
  );
};

export default MyEnrollClass;
