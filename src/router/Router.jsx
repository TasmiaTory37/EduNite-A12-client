import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AllClasses from "../pages/AllClasses";

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


            }
        ]
    }
])