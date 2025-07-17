import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../Hook/useAxiosSecure';


const Login = () => {
  const { register, handleSubmit } = useForm();
  const { userLogin, setUser, handleGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    document.title = 'EduNite | Login';
  }, []);

  // save user to DB securely after Google login
  const saveUserMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post('/users', userData); 
      return res.data;
    },
    onSuccess: () => {
      console.log('User saved to DB');
    },
    onError: () => {
      console.error('User save failed');
    }
  });

  // Email/Password Login
  const onSubmit = async (data) => {
    try {
      const result = await userLogin(data.email, data.password);
      const user = result.user;
      setUser(user);

      //  token post 
      const res = await axios.post('https://assignment-12-server-psi-jade.vercel.app/jwt', {
        email: user.email,
      });
      localStorage.setItem('access-token', res.data.token);

      Swal.fire('Success', 'Login successful!', 'success');
      navigate(from);
    } catch (error) {
      console.error('Login Error:', error);
      Swal.fire('Error', 'Login failed. Please check credentials.', 'error');
    }
  };

  //  Google Login + secure save
  const handleGoogleLogin = async () => {
    try {
      const result = await handleGoogle();
      const user = result.user;
      setUser(user);

      // Step 1: Get token
      const res = await axios.post('https://assignment-12-server-psi-jade.vercel.app/jwt', {
        email: user.email,
      });
      localStorage.setItem('access-token', res.data.token);

      // Step 2: Save user to DB securely using token
      saveUserMutation.mutate({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: 'student',
      });

      Swal.fire('Success', `Welcome ${user.displayName}`, 'success');
      navigate(from);
    } catch (error) {
      console.error('Google Login Error:', error);
      Swal.fire('Error', 'Google login failed.', 'error');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen max-w-7xl mx-auto p-8'>
      <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5'>
        <h2 className='text-center font-bold text-blue-500 text-2xl'>Login Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
          <fieldset className='fieldset'>
            <label className='text-base'>Email</label>
            <input
              type='email'
              {...register('email', { required: true })}
              className='input'
              placeholder='Email'
              required
            />

            <label className='text-base mt-4'>Password</label>
            <div className='relative w-full'>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                placeholder='Password'
                className='input pr-10'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='btn btn-xs absolute right-6 top-2.5 z-50'
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <label className='label'>
              <p className='label text-red-500 mt-3 link link-hover'>Forgot password?</p>
            </label>

            <button className='btn bg-blue-500 text-white mt-4' type='submit'>
              Login
            </button>

            <button onClick={handleGoogleLogin} type='button' className='btn mt-4'>
              <FaGoogle className='text-blue-500' /> Login With Google
            </button>

            <p className='text-base mt-2'>
              Don't have an account?{' '}
              <Link className='text-blue-500 link link-hover' to='/register'>
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
