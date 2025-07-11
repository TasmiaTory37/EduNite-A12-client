import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router'; 
import useAxiosSecure from '../Hook/useAxiosSecure';

const ClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/classes/${id}`)
      .then(res => setCls(res.data))
      .catch(err => console.error("Failed to load class", err));
  }, [axiosSecure, id]);

  if (!cls) return <p className="text-center mt-10 font-semibold">Loading class details...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <img
          src={cls.image}
          alt={cls.title}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-3">{cls.title}</h2>
          <p><strong>Instructor:</strong> {cls.name}</p>
          <p><strong>Email:</strong> {cls.email}</p>
          <p><strong>Price:</strong> ${cls.price}</p>
          <p><strong>Description:</strong> {cls.description}</p>
          <p><strong>Total Enrolled:</strong> {cls.enrollCount || 0}</p>

          <button
            onClick={() => navigate(`/payment/${cls._id}`)}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
