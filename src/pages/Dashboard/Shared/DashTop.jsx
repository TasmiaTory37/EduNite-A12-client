import { useContext } from 'react';
import { Link } from 'react-router';

import { FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import logo from '../../../assets/logo.png'; // Assuming you have a logo image

const Dashtop = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="bg-white px-6 py-3 shadow flex justify-between items-center ">
        <div className='flex justify-center items-center'>
            <img src={logo} className='h-[50px] w-[50px]' alt="" />
      <h2 className="text-2xl font-bold text-blue-600">EduNite</h2>

        </div>
      <div className="flex items-center gap-4">
        {user?.photoURL && (
          <img
            className="w-10 h-10 rounded-full border"
            src={user.photoURL}
            alt="profile"
            title={user.displayName || user.email}
          />
        )}

        <button
          onClick={logOut}
          className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Dashtop;
