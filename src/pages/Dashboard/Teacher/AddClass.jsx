import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newClass = {
      ...data,
      name: user.displayName,
      email: user.email,
      price: parseFloat(data.price),
      status: 'pending',
      enrollCount: 0,
      feedback: "",
    };

    try {
      const res = await axiosSecure.post('/classes', newClass);
      if (res.data.insertedId) {
        Swal.fire('Class Added!', 'Waiting for approval', 'success');
        reset();
        navigate('/dashboard/my-class');
      }
    } catch (err) {
      Swal.fire('Error', 'Class submission failed', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} placeholder="Class Title" className="input input-bordered w-full" />
        <input value={user?.displayName} readOnly className="input input-bordered w-full" />
        <input value={user?.email} readOnly className="input input-bordered w-full" />
        <input {...register("price", { required: true })} placeholder="Price" type="number" className="input input-bordered w-full" />
        <textarea {...register("description", { required: true })} placeholder="Description" className="textarea textarea-bordered w-full" />
        <input {...register("image", { required: true })} placeholder="Image URL" className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
