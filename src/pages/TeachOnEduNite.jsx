import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const TeachOnEduNite = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [statusInfo, setStatusInfo] = useState(null);
  const [isStatusLoading, setIsStatusLoading] = useState(true);

  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch current request status
  useEffect(() => {
    if (user?.email) {
      setIsStatusLoading(true);
     axiosSecure.get(`/teacher-requests/${encodeURIComponent(user.email)}`)

        .then(res => setStatusInfo(res.data))
        .catch(() => setStatusInfo(null))
        .finally(() => setIsStatusLoading(false));
    }
  }, [user, axiosSecure]);

  // ✅ Submit New Request
  const { mutate: submitRequest, isLoading } = useMutation({
    mutationFn: (data) => axiosSecure.post('/teacher-requests', data),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Submitted!',
        text: 'Your request has been submitted for review.',
      });
      setStatusInfo({ status: 'pending' });
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Something went wrong. Please try again.',
      });
    }
  });

  // ✅ Re-Request After Rejected
  const { mutate: reRequest } = useMutation({
    mutationFn: (email) => axiosSecure.patch(`/teacher-requests/status/${email}`, { status: 'pending' }),
    onSuccess: () => {
      setStatusInfo({ status: 'pending' });
      Swal.fire({
        icon: 'success',
        title: 'Requested Again!',
        text: 'Your request is under review again.',
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Could not request again.',
      });
    }
  });

  // ✅ Form Submission Handler
  const onSubmit = (data) => {
    const request = {
      ...data,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      status: 'pending',
    };
    submitRequest(request);
  };

  // ✅ Loading Spinner
  if (isStatusLoading) {
    return (
      <div className="text-center mt-20 min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  // ✅ If already approved
  if (statusInfo?.status === 'approved') {
    return (
      <div className="text-center mt-20 min-h-screen">
        <h2 className="text-2xl font-bold text-green-600">You are now a Teacher on EduNite!</h2>
      </div>
    );
  }

  // ✅ If request is pending
  if (statusInfo?.status === 'pending') {
    return (
      <div className="text-center mt-20 min-h-screen">
        <h2 className="text-xl font-semibold text-blue-600"> Your request is under review.</h2>
      </div>
    );
  }

  // ✅ If rejected: show "Request Again"
  if (statusInfo?.status === 'rejected') {
    return (
      <div className="text-center mt-20 min-h-screen">
        <h2 className="text-xl font-semibold text-red-600">Your previous request was rejected.</h2>
        <p className="text-gray-600 mb-4">You can request again for review.</p>
        <button
          onClick={() => reRequest(user.email)}
          className="btn btn-warning"
        >
          Request Again
        </button>
      </div>
    );
  }

  // ✅ Default: New User / No previous request
  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Apply to Teach on EduNite</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          defaultValue={user?.displayName}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          {...register("email")}
          defaultValue={user?.email}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          {...register("photoURL")}
          defaultValue={user?.photoURL}
          readOnly
          className="input input-bordered w-full"
        />

        <select {...register("experience", { required: true })} className="select select-bordered w-full">
          <option value="">Select Experience</option>
          <option value="beginner">Beginner</option>
          <option value="mid-level">Mid-Level</option>
          <option value="experienced">Experienced</option>
        </select>

        <input
          {...register("title")}
          placeholder="Title (e.g., Full Stack Developer)"
          className="input input-bordered w-full"
          required
        />

        <select {...register("category", { required: true })} className="select select-bordered w-full">
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="SQA">SQA</option>
          <option value="Data Science">Data Science</option>
        </select>

        <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
          {isLoading ? 'Submitting...' : 'Submit for Review'}
        </button>
      </form>
    </div>
  );
};

export default TeachOnEduNite;
