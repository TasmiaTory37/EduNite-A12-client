import { NavLink, Outlet } from "react-router"; 
import {
  FaBars,
  FaChalkboardTeacher,
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaBook,
  FaPlus,
  FaTasks,
} from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { useEffect, useState } from "react";
import useRole from "../Hook/useRole";
import Dashtop from "../pages/Dashboard/Shared/DashTop";

const Dashboard = () => {
  const [role] = useRole();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (role !== undefined) setLoading(false);
  }, [role]);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 font-semibold bg-white text-blue-800 px-4 py-2 rounded transition"
      : "flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded transition";

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false); // auto-close on mobile
    }
  };

  if (loading) return <div className="text-center py-10">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
     <Dashtop toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-50 bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
       <aside
          className={`fixed md:static top-0 left-0 h-full md:h-auto z-50 w-64 bg-blue-800 text-white p-5 shadow-lg transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >

          <h2 className="text-xl md:text-2xl font-bold text-center mb-4">Dashboard</h2>
          <ul className="space-y-2 text-sm md:text-base">
            {role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/admin-home" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaHome /> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/teacher-request" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaChalkboardTeacher /> Teacher Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaUsers /> Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-classes" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaBook /> All Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaUserGraduate /> Profile
                  </NavLink>
                </li>
              </>
            )}

            {role === "teacher" && (
              <>
                <li>
                  <NavLink to="/dashboard/teacher-home" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaHome /> Teacher Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-class" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaPlus /> Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-class" className={getNavLinkClass} onClick={handleNavClick}>
                    <MdOutlineClass /> My Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaUserGraduate /> Profile
                  </NavLink>
                </li>
              </>
            )}

            {role === "student" && (
              <>
                <li>
                  <NavLink to="/dashboard/student-home" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaHome /> Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-enroll-class" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaTasks /> My Enroll Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile" className={getNavLinkClass} onClick={handleNavClick}>
                    <FaUserGraduate /> Profile
                  </NavLink>
                </li>
              </>
            )}

            {(!role || !["admin", "teacher", "student"].includes(role)) && (
              <li>Invalid role</li>
            )}
          </ul>

          <div className="border-t border-white mt-6 pt-4 text-sm text-center">
            <NavLink to="/" className="hover:underline" onClick={handleNavClick}>
              ← Back to Home
            </NavLink>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto mt-16 md:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;