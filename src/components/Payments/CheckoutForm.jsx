import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const CheckoutForm = ({ amount, classId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // ✅ Fixed

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError('');
    setSuccess('');

    const card = elements.getElement(CardElement);
    if (!stripe || !card) return;

    try {
      // Step 1: Create PaymentIntent
      const { data } = await axios.post('http://localhost:3000/create-payment-intent', {
        amount,
      });

      const clientSecret = data.clientSecret;

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setSuccess('Payment successful! ✅');

        // Step 3: Save payment and enrollment
        await axiosSecure.post('/payments', {
          email: user?.email,
          amount: result.paymentIntent.amount,
          transactionId: result.paymentIntent.id,
          classId,
          date: new Date(),
        });

        // Step 4: Redirect to enrolled classes page
        setTimeout(() => navigate('/dashboard/my-enroll-class'), 1500);
      }
    } catch (err) {
      setError(err.message || 'Payment failed.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
