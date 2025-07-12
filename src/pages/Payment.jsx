import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';
import CheckoutForm from '../components/Payments/CheckoutForm';

const Payment = () => {
  const { id: classId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [cls, setCls] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/classes/${classId}`)
      .then(res => setCls(res.data))
      .catch(err => console.error("Failed to load class", err));
  }, [axiosSecure, classId]);

  if (!cls) return <p className="text-center mt-10">Loading class info...</p>;

  return (
    <div className="pt-10">
      <h2 className="text-2xl text-center mb-6 font-semibold">Make a Payment</h2>
      <CheckoutForm amount={cls.price * 100} classId={classId} />
    </div>
  );
};

export default Payment;
