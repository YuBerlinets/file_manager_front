import { useEffect, useState } from 'react';
import { api } from '../../app/api/ApiConfig';

interface NotConfirmedUsers {
    data: NotConfirmedUser[]
}
interface NotConfirmedUser {
    username: string;
    name: string;
    isConfirmed: boolean;
    registrationDate: Date;
    roles: string[];
}


export default function AdminPanel() {
    const [notConfirmedUsers, setNotConfirmedUsers] = useState<NotConfirmedUser[]>([]);
    useEffect(() => {
        const fetchNotConfirmedUsers = async () => {
            try {
                const usersData: NotConfirmedUsers = await api.user.getNotConfirmedUsers();
                console.log(usersData.data);
                setNotConfirmedUsers(usersData.data);
            } catch (error) {
                console.log(error)
            }

        }
        fetchNotConfirmedUsers()
    }, []);

    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_text'>Admin Panel</h1>
                    <span className="account_info">Hi, {localStorage.getItem('username')}.</span>
                    <div className="users_div">
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
                                    //TODO: add date and assign roles and confirm button
                                    notConfirmedUsers.map((user, index) => (
                                        <tr key={index} className='users_table_inner'>
                                            <td className='user_table_td'>{user.username}</td>
                                            <td className='user_table_td'>{user.name}</td>
                                            <td className='user_table_td'>{user.isConfirmed ? 'Yes' : 'No'}</td>
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
                </div>
            </div>
        </div>
    );
}