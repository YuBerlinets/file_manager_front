import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Login from "../../features/login/Login";
import FileManager from "../../features/filemanager/FileManager";
import Register from "../../features/register/Register";
import Error from "../../features/error/Error";
import Account from "../../features/account/Account";
import AdminPanel from "../../features/adminPanel/AdminPanel";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [{ path: '/login', element: <Login /> },
        {
            path: '/register', element: <Register />
        },
        {
            path: '/manager', element: <FileManager />,
        },
        {
            path: '/account', element: <Account />
        },
        {
            path: '/adminPanel', element: <AdminPanel />
        },
        {
            path: '/', element: <Login />
        },
        {
            path: '/*', element: <Error />
        }]
    }
])