import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { userLogin, setUser, handleGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    document.title = 'EduNite | Login';
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await userLogin(data.email, data.password);
      const user = result.user;
      setUser(user);

      const res = await axios.post('https://assignment-12-server-psi-jade.vercel.app/jwt', { email: user.email });
      localStorage.setItem('access-token', res.data.token);

      Swal.fire('Success', 'Login successful!', 'success');
      navigate(from);
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire('Error', 'Login failed. Please check credentials.', 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await handleGoogle();
      const user = result.user;
      setUser(user);

      // Optional: Save to DB (if first time)
      await axios.post('https://assignment-12-server-psi-jade.vercel.app/users', {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      const res = await axios.post('https://assignment-12-server-psi-jade.vercel.app/jwt', { email: user.email });
      localStorage.setItem('access-token', res.data.token);

      Swal.fire('Success', `Welcome ${user.displayName}`, 'success');
      navigate(from);
    } catch (error) {
      console.error("Google Login Error:", error);
      Swal.fire('Error', 'Google login failed.', 'error');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen max-w-7xl mx-auto p-8'>
      <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5'>
        <h2 className='text-center font-bold text-blue-500 text-2xl'>Login Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
          <fieldset className='fieldset'>
            {/* Email */}
            <label className='text-base'>Email</label>
            <input
              type='email'
              {...register('email', { required: true })}
              className='input'
              placeholder='Email'
              required
            />

            {/* Password */}
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

            {/* Forgot Password */}
            <label className='label'>
              <p className='label text-red-500 mt-3 link link-hover'>Forgot password?</p>
            </label>

            {/* Submit */}
            <button className='btn bg-blue-500 text-white mt-4' type='submit'>
              Login
            </button>

            {/* Google Login */}
            <button onClick={handleGoogleLogin} type='button' className='btn mt-4'>
              <FaGoogle className='text-blue-500' /> Login With Google
            </button>

            {/* Link to Register */}
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
