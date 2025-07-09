import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AllClasses from "../pages/AllClasses";
import Login from "../pages/login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout/>,
        errorElement: <ErrorPage />,

        children: [
            {
                index: true,
                element:<Home/>,
            },
            {
                path:'/all-classes',
                element:<AllClasses/>


            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            }

        ]
    }
])