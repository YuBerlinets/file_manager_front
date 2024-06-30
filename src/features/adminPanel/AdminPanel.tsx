import { useEffect, useState } from 'react';
import { api } from '../../app/api/ApiConfig';
import UserTable from '../../componets/UsersTable';

interface Users {
    data: User[]
}
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
                const usersData: Users = await api.user.getNotConfirmedUsers();
                setNotConfirmedUsers(usersData.data);
            } catch (error) {
                console.log(error)
            }

        }
        fetchNotConfirmedUsers()
    }, []);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData: Users = await api.user.getUsers();
                console.log(usersData.data);
                setUsers(usersData.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, []);

    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_text'>Admin Panel</h1>
                    <span className="account_info">Hi, {localStorage.getItem('username')}.</span>
                    <div className="users_div">
                        <h2>Not confirmed users</h2>
                        <table className='users_table'>
                            <thead className='users_table_head'>
                                <tr className='users_table_inner'>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>isConfirmed</th>
                                    <th>Date</th>
                                    <th>Roles</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='users_table_body'>
                                {
                                    notConfirmedUsers.map((user, index) => (
                                        <tr key={index} className='users_table_inner'>
                                            <td className='user_table_td'>{user.username}</td>
                                            <td className='user_table_td'>{user.name}</td>
                                            <td className='user_table_td'>{user.accountIsConfirmed ? 'Yes' : 'No'}</td>
                                            <td className='user_table_td'>{user.registrationDate === null ? 'No data' : user.registrationDate.toLocaleString()}</td>
                                            <td className='user_table_td'>{user.roles.toString()}</td>
                                            <td className='user_table_td'>
                                                <a onClick={() => api.user.confirmUser(user.username)} className='confirm_button'>Confirm</a>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="users_table">
                        <h2>All Users</h2>
                        <UserTable users={users} />
                    </div>
                </div>
            </div>
        </div>
    );
}