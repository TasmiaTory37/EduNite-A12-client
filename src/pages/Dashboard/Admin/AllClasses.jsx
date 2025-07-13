import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useNavigate } from 'react-router';

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: classes = [], isLoading, refetch } = useQuery({
    queryKey: ['all-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes');
      return res.data;
    },
  });

  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/classes/status/${id}`, { status });
      refetch();
    } catch (error) {
      console.error('Status update failed', error);
    }
  };

  const handleViewProgress = (classId) => {
    navigate(`/dashboard/class-progress/${classId}`);
  };

  if (isLoading) return <div className="text-center py-10 font-semibold">Loading classes...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">All Classes</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 text-sm">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
              <th className="p-3 text-left">Progress</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {classes.map(cls => (
              <tr key={cls._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-semibold">{cls.title}</td>
                <td className="p-3">
                  <img src={cls.image} alt={cls.title} className="w-20 h-14 object-cover rounded-md border" />
                </td>
                <td className="p-3">{cls.email}</td>
                <td className="p-3">{cls.description?.slice(0, 50)}...</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${cls.status === 'approved' ? 'bg-green-500' : cls.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {cls.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 disabled:opacity-50"
                    disabled={cls.status === 'approved'}
                    onClick={() => handleStatus(cls._id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 disabled:opacity-50"
                    disabled={cls.status === 'rejected'}
                    onClick={() => handleStatus(cls._id, 'rejected')}
                  >
                    Reject
                  </button>
                </td>
                <td className="p-3">
                  <button
                    disabled={cls.status !== 'approved'}
                    onClick={() => handleViewProgress(cls._id)}
                    className={`px-3 py-1 text-xs rounded ${cls.status === 'approved' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                  >
                    View Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClasses;
