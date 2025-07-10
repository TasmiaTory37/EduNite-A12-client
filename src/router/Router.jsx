import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../layout/Dashboard"; // your dashboard layout
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AllClasses from "../pages/AllClasses";


// Dashboard Pages (Student, Teacher, Admin)
import StudentHome from "../pages/Dashboard/Student/StudentHome";
import MyEnrollClass from "../pages/Dashboard/Student/MyEnrollClass";
import MyEnrollClassDetails from "../pages/Dashboard/Student/MyEnrollClassDetails";
import TeacherHome from "../pages/Dashboard/Teacher/TeacherHome";
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import MyClass from "../pages/Dashboard/Teacher/MyClass";
import MyClassDetails from "../pages/Dashboard/Teacher/MyClassDetails";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import TeacherRequest from "../pages/Dashboard/Admin/TeacherRequest";
import Users from "../pages/Dashboard/Admin/Users";
import AllAdminClasses from "../pages/Dashboard/Admin/AllClasses";
import Profile from "../pages/Dashboard/Shared/Profile";

import PrivateRoute from "./PrivateRoute"; // assumes you’ve a private route component
import Login from "../pages/login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // Shared
      { path: "profile", element: <Profile /> },

      // Student
      { path: "/dashboard/student-home", element: <StudentHome /> },
      { path: "/dashboard/my-enroll-class", element: <MyEnrollClass /> },
      { path: "/dashboard/my-enroll-class/:id", element: <MyEnrollClassDetails /> },

      // Teacher
      { path: "teacherHome", element: <TeacherHome /> },
      { path: "addClass", element: <AddClass /> },
      { path: "myClass", element: <MyClass /> },
      { path: "my-class/:id", element: <MyClassDetails /> },

      // Admin
      { path: "adminHome", element: <AdminHome /> },
      { path: "teacherRequest", element: <TeacherRequest /> },
      { path: "users", element: <Users /> },
      { path: "allClasses", element: <AllAdminClasses /> },
    ],
  },
]);
