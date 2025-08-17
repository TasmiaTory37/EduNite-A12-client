import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import usePagination from '../../../Hook/usePagination';
import Pagination from '../../../components/Pagination';

const MyClass = () => {
   useEffect(() => {
            document.title = "EduNite | My Class"; 
          }, []);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [editingClass, setEditingClass] = useState(null);
  const [updatedData, setUpdatedData] = useState({ title: '', price: '', description: '', image: '' });

  const { data: myClasses = [], refetch, isLoading } = useQuery({
    queryKey: ['my-classes', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/teacher/${user.email}`);
      return res.data;
    },
  });

  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage
  } = usePagination(myClasses, 10); // show 10 cards per page

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the class.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/classes/${id}`);
      Swal.fire('Deleted!', 'Your class has been deleted.', 'success');
      refetch();
    }
  };

  const openEditModal = (cls) => {
    setEditingClass(cls);
    setUpdatedData({
      title: cls.title,
      price: cls.price,
      description: cls.description,
      image: cls.image
    });
  };

  const handleUpdate = async () => {
    try {
      await axiosSecure.patch(`/classes/${editingClass._id}`, updatedData);
      setEditingClass(null);
      Swal.fire('Updated!', 'Class information has been updated.', 'success');
      refetch();
    } catch (error) {
      Swal.fire('Error!', 'Update failed.', 'error');
    }
  };

  if (isLoading) return <p className="text-center mt-10 font-semibold">Loading your classes...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">My Classes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map(cls => (
          <div key={cls._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={cls.image} alt={cls.title} className="w-full h-40 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">{cls.title}</h3>
              <p className='text-black'><strong>Name:</strong> {cls.name}</p>
              <p  className='text-black'><strong>Email:</strong> {cls.email}</p>
              <p  className='text-black'><strong>Price:</strong> ${cls.price}</p>
              <p  className='text-black'><strong>Description:</strong> {cls.description}</p>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${cls.status === 'approved' ? 'bg-green-500 text-white' : cls.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                {cls.status}
              </span>
              <div className="flex flex-wrap gap-2 pt-3">
                <button onClick={() => openEditModal(cls)} className="btn btn-xs btn-outline btn-info">Update</button>
                <button onClick={() => handleDelete(cls._id)} className="btn btn-xs btn-outline btn-error">Delete</button>
                <button
                  onClick={() => navigate(`/dashboard/my-class/${cls._id}`)}
                  disabled={cls.status !== 'approved'}
                  className={`btn btn-xs ${cls.status === 'approved' ? 'btn-primary' : 'btn-disabled'}`}
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
     
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
  

      {/* Edit Modal */}
      {editingClass && (
        <div className="fixed inset-0 bg-blue-50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
            <h3 className="text-lg font-bold mb-4 text-blue-600">Update Class</h3>
            <input type="text" className="input input-bordered w-full" value={updatedData.title} onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })} placeholder="Title" />
            <input type="text" className="input input-bordered w-full" value={updatedData.price} onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })} placeholder="Price" />
            <input type="text" className="input input-bordered w-full" value={updatedData.image} onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.value })} placeholder="Image URL" />
            <textarea className="textarea textarea-bordered w-full" value={updatedData.description} onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })} placeholder="Description"></textarea>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditingClass(null)} className="btn btn-sm">Cancel</button>
              <button onClick={handleUpdate} className="btn btn-sm btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClass;
