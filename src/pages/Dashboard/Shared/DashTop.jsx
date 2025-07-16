import { useContext } from 'react';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import logo from '../../../assets/logo.png';

const Dashtop = ({ toggleSidebar }) => {
  const { user, logOut } = useContext(AuthContext);

  return (
   <div className="bg-white px-4 sm:px-6 py-3 shadow flex justify-between items-center fixed top-0 w-full z-40 md:static">

      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger: Only show on mobile */}
        <button
          className="md:hidden text-xl text-blue-800"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <img src={logo} className="h-10 w-10" alt="EduNite logo" />
        <h2 className="text-xl font-bold text-blue-600">EduNite</h2>
      </div>

      {/* Right: Avatar + Logout */}
      <div className="flex items-center gap-3">
        {user?.photoURL && (
          <img
            className="w-9 h-9 rounded-full border"
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
