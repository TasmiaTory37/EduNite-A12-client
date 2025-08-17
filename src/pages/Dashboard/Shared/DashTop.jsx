import { useContext, useEffect } from 'react';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router'; 

const Dashtop = ({ toggleSidebar }) => {
  const { user, logOut } = useContext(AuthContext);
       // theme toggle state on load
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
  
      // set checkbox state
      const checkbox = document.querySelector(".theme-controller");
      if (checkbox) {
        checkbox.checked = savedTheme === "dark";
      }
    }, []);
  
    const handleThemeChange = (e) => {
      const newTheme = e.target.checked ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };

  return (
    <div className="bg-white px-4 sm:px-6 py-3 shadow flex justify-between items-center sticky top-0 w-full z-40 md:static">

      {/* Left: Hamburger + Logo (Clickable) */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-xl text-blue-800"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/*  Wrap logo & name in Link */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-10 w-10" alt="EduNite logo" />
          <h2 className="text-xl font-bold text-blue-600">EduNite</h2>
        </Link>
      </div>

      {/* Right: Avatar + Logout */}
      <div className="flex items-center gap-3">
         <label className="toggle text-base-content">
              <input
                type="checkbox"
                className="theme-controller"
                value="dark"
                onChange={handleThemeChange}
              />

              <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

              <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

            </label>

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
