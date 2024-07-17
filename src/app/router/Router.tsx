import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Login from "../../features/login/Login";
import FileManager from "../../features/filemanager/FileManager";
import Register from "../../features/register/Register";
import Error from "../../features/error/Error";
import Account from "../../features/account/Account";
import AdminPanel from "../../features/adminPanel/AdminPanel";
import UserDetails from "../../features/account/UserDetails";

const token = localStorage.getItem('token');
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: token ? <FileManager /> : <Navigate to="/login" />
            },
            {
                path: '/login',
                element: !token ? <Login /> : <Navigate to="/" />
            },
            {
                path: '/register',
                element: <Register />
            },

            {
                path: '/account',
                element: token ? <Account /> : <Navigate to="/login" />
            },
            {
                path: '/account/adminPanel',
                element: token ? <AdminPanel /> : <Navigate to="/login" />
            },
            {
                path: '/adminPanel/account/:username',
                element: token ? <UserDetails /> : <Navigate to="/login" />
            },
            {
                path: '*',
                element: <Error />
            }
        ]
    }
]);

export { router };
