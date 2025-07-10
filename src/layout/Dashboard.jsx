import { NavLink, Outlet } from "react-router";
import { FaChalkboardTeacher, FaHome, FaUserGraduate, FaUsers, FaBook, FaPlus, FaTasks } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { useEffect, useState } from "react";
import useRole from "../Hook/useRole";
import Dashtop from "../pages/Dashboard/Shared/DashTop";


const Dashboard = () => {
  const [role] = useRole();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== undefined) setLoading(false);
  }, [role]);

  if (loading) return <div className="text-center py-10">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <Dashtop />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-blue-800 text-white p-5 space-y-4 shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
          <ul className="space-y-3">
            {role === "admin" && (
              <>
                <li><NavLink to="/dashboard/admin-home"><FaHome /> Admin Home</NavLink></li>
                <li><NavLink to="/dashboard/teacher-request"><FaChalkboardTeacher /> Teacher Request</NavLink></li>
                <li><NavLink to="/dashboard/users"><FaUsers /> Users</NavLink></li>
                <li><NavLink to="/dashboard/all-classes"><FaBook /> All Classes</NavLink></li>
                <li><NavLink to="/dashboard/profile"><FaUserGraduate /> Profile</NavLink></li>
              </>
            )}

            {role === "teacher" && (
              <>
                <li><NavLink to="/dashboard/teacher-home"><FaHome /> Teacher Home</NavLink></li>
                <li><NavLink to="/dashboard/add-class"><FaPlus /> Add Class</NavLink></li>
                <li><NavLink to="/dashboard/my-class"><MdOutlineClass /> My Class</NavLink></li>
                <li><NavLink to="/dashboard/profile"><FaUserGraduate /> Profile</NavLink></li>
              </>
            )}

            {role === "student" && (
              <>
                <li><NavLink to="/dashboard/student-home"><FaHome /> Student Home</NavLink></li>
                <li><NavLink to="/dashboard/my-enroll-class"><FaTasks /> My Enroll Class</NavLink></li>
                <li><NavLink to="/dashboard/profile"><FaUserGraduate /> Profile</NavLink></li>
              </>
            )}

            {(!role || !["admin", "teacher", "student"].includes(role)) && (
              <li>Invalid role</li>
            )}
          </ul>
          <div className="border-t border-white mt-6 pt-4">
            <NavLink to="/" className="text-sm hover:underline">← Back to Home</NavLink>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
