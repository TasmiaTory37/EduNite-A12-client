import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import usePagination from '../../../Hook/usePagination';
import Pagination from '../../../components/Pagination';

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['teacher-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher-requests');
      return res.data;
    }
  });

  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
    prevPage,
    nextPage
  } = usePagination(requests, 10);

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ email, status }) =>
      await axiosSecure.patch(`/teacher-requests/status/${email}`, { status }),
    onSuccess: () => {
      Swal.fire('Success!', 'Status updated!', 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error!', 'Could not update status.', 'error');
    }
  });

  return (
    <div className="overflow-x-auto mt-10 px-6">
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200">
            <th>#</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Experience</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((req, index) => (
            <tr key={req._id}>
              <td>{(currentPage - 1) * 10 + index + 1}</td>
              <td>{req.name}</td>
              <td><img src={req.photoURL} alt="" className="w-10 h-10 rounded-full" /></td>
              <td>{req.experience}</td>
              <td>{req.title}</td>
              <td>{req.category}</td>
              <td>{req.status}</td>
              <td className="space-x-2">
                <button
                  className="btn btn-xs btn-success"
                  disabled={req.status === 'approved' || req.status === 'rejected'}
                  onClick={() => updateStatus({ email: req.email, status: 'approved' })}
                >
                  Approve
                </button>
                <button
                  className="btn btn-xs btn-error"
                  disabled={req.status === 'approved' || req.status === 'rejected'}
                  onClick={() => updateStatus({ email: req.email, status: 'rejected' })}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
    </div>
  );
};

export default TeacherRequest;
