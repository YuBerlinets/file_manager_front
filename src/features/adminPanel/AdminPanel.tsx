import { useEffect, useState } from 'react';
import { api } from '../../app/api/ApiConfig';
import UserTable from '../../components/UsersTable';

interface User {
    username: string;
    name: string;
    accountIsConfirmed: boolean;
    registrationDate: Date;
    roles: string[];
}

export default function AdminPanel() {
    const [notConfirmedUsers, setNotConfirmedUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchNotConfirmedUsers = async () => {
            try {
                const usersData = await api.admin.getNotConfirmedUsers();
                setNotConfirmedUsers(usersData.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotConfirmedUsers();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await api.admin.getUsers();
                console.log(usersData.data);
                setUsers(usersData.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    const handleConfirm = async (username: string) => {
        try {
            await api.admin.confirmUser(username);
            setNotConfirmedUsers((prevUsers) => prevUsers.filter(user => user.username !== username));
            setUsers((prevUsers) => prevUsers.map(user => user.username === username ? { ...user, accountIsConfirmed: true } : user));
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (username: string) => {
        try {
            await api.admin.deleteUser(username);
            setUsers((prevUsers) => prevUsers.filter(user => user.username !== username));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_account_text'>Admin Panel</h1>
                    <span className="upper_username_text">Hi, {localStorage.getItem('username')}.</span>
                    <div className="users_div">
                        <h2>Not Confirmed Users</h2>
                        <UserTable users={notConfirmedUsers} type="notConfirmed" onAction={handleConfirm} />
                    </div>
                    <div className="users_table">
                        <h2>All Users</h2>
                        <UserTable users={users} type="all" onAction={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
}
