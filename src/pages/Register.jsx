import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createNewUser, setUser, handleGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = 'EduNite | Register';
  }, []);

  const onSubmit = async (data) => {
    const { name, email, url, pass } = data;

    const passwordValid = /(?=.*[A-Z])(?=.*[a-z]).{6,}/.test(pass);
    if (!passwordValid) {
      Swal.fire({
        title: 'Oops!',
        text: 'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return;
    }

    try {
      const result = await createNewUser(email, pass, name, url);
      const user = result.user;
      setUser(user);

      const userInfo = {
        name,
        email,
        photoURL: url,
        role: 'student',
      };

      await axios.post('http://localhost:3000/users', userInfo);

      const tokenRes = await axios.post('http://localhost:3000/jwt', { email });
      localStorage.setItem('access-token', tokenRes.data.token);

      Swal.fire({
        title: 'Congratulations!',
        text: 'Registration Successful.',
        icon: 'success',
        confirmButtonText: 'Okay',
      });

      navigate('/');
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: `Registration failed: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  const handleGoogleLogin = () => {
    handleGoogle()
      .then(async (res) => {
        const user = res.user;
        setUser(user);

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'student',
        };

        await axios.post('http://localhost:3000/users', userInfo);
        const tokenRes = await axios.post('http://localhost:3000/jwt', { email: user.email });
        localStorage.setItem('access-token', tokenRes.data.token);

        Swal.fire({
          title: 'Welcome!',
          text: `Hello, ${user.displayName}`,
          icon: 'success',
          confirmButtonText: 'Okay',
        });

        navigate('/');
      })
      .catch((err) => {
        Swal.fire({
          title: 'Oops!',
          text: `Google login failed: ${err.message}`,
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      });
  };

  return (
    <div className='flex justify-center items-center my-5'>
      <div className='card bg-base-100 w-full max-w-sm shadow-2xl py-5'>
        <h2 className='text-center font-bold text-blue-700 text-2xl'>Register Here!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
          <fieldset className='fieldset'>
            <label className='text-base'>Name</label>
            <input type='text' className='input' placeholder='Your Name' {...register('name', { required: true })} />

            <label className='text-base'>Photo URL</label>
            <input type='text' className='input' placeholder='Photo URL' {...register('url', { required: true })} />

            <label className='text-base'>Email</label>
            <input type='email' className='input' placeholder='Email' {...register('email', { required: true })} />

            <label className='text-base'>Password</label>
            <div className='relative w-full'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='input pr-10'
                {...register('pass', { required: true })}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='btn btn-xs absolute right-6 top-2.5 z-50'
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button className='btn bg-blue-600 text-white mt-4'>Register</button>
            <button type='button' onClick={handleGoogleLogin} className='btn mt-4'>
              <FaGoogle className='text-blue-800' /> Register With Google
            </button>
            <p className='text-base'>Already have an Account? <Link className='text-blue-500 link link-hover' to='/login'>Login</Link></p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
