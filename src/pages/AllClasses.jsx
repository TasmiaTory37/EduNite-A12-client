import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useNavigate } from 'react-router'; // ✅ import navigate

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // ✅ initialize navigate

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['approved-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/approved-classes');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-20 font-semibold">Loading Classes...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">Explore Approved Classes</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {classes.map(cls => (
          <div key={cls._id} className="bg-white rounded-lg shadow hover:shadow-md transition">
            <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover rounded-t" />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-blue-700">{cls.title}</h3>
              <p><strong>Instructor:</strong> {cls.name}</p>
              <p><strong>Price:</strong> ${cls.price}</p>
              <p className="text-sm text-gray-600">{cls.description.slice(0, 80)}...</p>
              <p><strong>Enrolled:</strong> {cls.enrollCount || 0}</p>
              <button
                onClick={() => navigate(`/class/${cls._id}`)} // ✅ redirect to class details
                className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
