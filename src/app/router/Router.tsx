import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Login from "../../features/login/Login";
import FileManager from "../../features/filemanager/FileManager";
import Register from "../../features/register/Register";
import Error from "../../features/error/Error";
import Account from "../../features/account/Account";
import AdminPanel from "../../features/adminPanel/AdminPanel";

const token = localStorage.getItem('token');
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: token ? <Navigate to="/filemanager" /> : <Navigate to="/login" />
            },
            {
                path: '/login',
                element: !token ? <Login /> : <Navigate to="/filemanager" />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/filemanager',
                element: token ? <FileManager /> : <Navigate to="/login" />
            },
            {
                path: '/filemanager/account',
                element: token ? <Account /> : <Navigate to="/login" />
            },
            {
                path: '/filemanager/account/adminPanel',
                element: token ? <AdminPanel /> : <Navigate to="/login" />
            },
            {
                path: '*',
                element: <Error />
            }
        ]
    }
]);

export { router };
