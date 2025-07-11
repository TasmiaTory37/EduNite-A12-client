import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router';
import logo from '../assets/logo.png';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../Hook/useAxiosSecure';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
    

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => setDbUser(res.data))
        .catch(err => console.error("Error fetching dbUser:", err));
    }
  }, [user, axiosSecure]);
    if (loading) return null;

  return (
    <div>
      <div className="bg-white w-full shadow">
        <div className="navbar max-w-7xl mx-auto px-5 md:px-10 justify-between items-center">

          {/* Start */}
          <div className="navbar-start justify-start items-center">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><NavLink className={({ isActive }) => isActive ? 'text-blue-500' : ''} to='/'>Home</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'text-blue-500' : ''} to='/all-classes'>All Classes</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'text-blue-500' : ''} to='/contact'>Contact</NavLink></li>
                {user && (
                  <li><NavLink className={({ isActive }) => isActive ? 'text-blue-500' : ''} to='/teach-on-edunite'>Teach on EduNite</NavLink></li>
                )}
              </ul>
            </div>
            <div className='flex justify-center items-center gap-1'>
              <img className='w-[50px] h-[50px]' src={logo} alt="Logo" />
              <Link to='/' className="text-blue-500 font-bold text-xl">EduNite</Link>
            </div>
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><NavLink className={({ isActive }) => isActive ? 'text-blue-500' : ''} to='/'>Home</NavLink></li>
              <li><NavLink className={({ isActive }) => isActive ? 'text-blue-500' : ''} to='/all-classes'>All Classes</NavLink></li>
              <li><NavLink className={({ isActive }) => isActive ? 'text-blue-500' : ''} to='/contact'>Contact</NavLink></li>
              {user && (
                <li><NavLink className={({ isActive }) => isActive ? 'text-blue-500' : ''} to='/teach-on-edunite'>Teach on EduNite</NavLink></li>
              )}
            </ul>
          </div>

          {/* End */}
          <div className="navbar-end gap-4">
            {loading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : user && user?.email ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user?.photoURL || dbUser?.photoURL || 'https://i.ibb.co/MBtjqXQ/default-avatar.png'}
                      alt="Profile"
                    />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="text-center font-semibold text-gray-700 pointer-events-none">
                    {user?.displayName || dbUser?.name || user?.email}
                  </li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><button onClick={logOut}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn bg-blue-500 text-white hover:bg-blue-600 rounded-none">Login</Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
