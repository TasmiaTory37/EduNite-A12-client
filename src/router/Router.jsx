import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../layout/Dashboard";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AllClasses from "../pages/AllClasses";
import ClassDetails from "../pages/ClassDetails"; 
import Payment from "../pages/Payment";

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

// Auth Pages
import Login from "../pages/login";
import Register from "../pages/Register";
import TeachOnEduNite from "../pages/TeachOnEduNite";

// Routes
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";
import TeacherRoute from "./TeacherRoute";
import AdminRoute from "./AdminRoute";
import Contact from "../pages/Contact";
import ClassProgress from "../pages/Dashboard/Admin/ClassProgress";
import AboutUs from "../pages/AboutUs";


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
        path:'/contact',
        element:<Contact></Contact>
      },
      {
        path:'/aboutus',
        element:<AboutUs/>
      },
      {
        path: "/class/:id", 
        element: <PrivateRoute><ClassDetails /></PrivateRoute>,
      },
      {
        path: "/payment/:id", 
        element: <PrivateRoute><Payment/></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/teach-on-edunite",
        element: <PrivateRoute><TeachOnEduNite /></PrivateRoute>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // Shared
      { path: "/dashboard/profile", element: <Profile /> },

      // Student
      { path: "/dashboard/student-home", element: <StudentRoute><StudentHome /></StudentRoute> },
      { path: "/dashboard/my-enroll-class", element: <StudentRoute><MyEnrollClass /></StudentRoute> },
      { path: "/dashboard/my-enroll-class/:id", element: <StudentRoute><MyEnrollClassDetails /></StudentRoute> },

      // Teacher
      { path: "/dashboard/my-teacher-home", element: <TeacherRoute><TeacherHome /></TeacherRoute> },
      { path: "/dashboard/add-class", element: <TeacherRoute><AddClass /></TeacherRoute> },
      { path: "/dashboard/my-class", element: <TeacherRoute><MyClass /></TeacherRoute> },
      { path: "/dashboard/my-class/:id", element: <TeacherRoute><MyClassDetails /></TeacherRoute> },

      // Admin
      { path: "/dashboard/admin-home", element: <AdminRoute><AdminHome /></AdminRoute> },
      { path: "/dashboard/teacher-request", element: <AdminRoute><TeacherRequest /></AdminRoute> },
      { path: "/dashboard/users", element: <AdminRoute><Users /></AdminRoute> },
      { path: "/dashboard/all-classes", element: <AdminRoute><AllAdminClasses /></AdminRoute> },
      { path:"/dashboard/class-progress/:id" ,element:<AdminRoute><ClassProgress/></AdminRoute>},

    ],
  },
]);
