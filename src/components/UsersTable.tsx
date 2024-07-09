
import { useNavigate } from 'react-router-dom';

interface User {
    username: string;
    name: string;
    accountIsConfirmed: boolean;
    registrationDate: Date;
    roles: string[];
}

interface UserTableProps {
    users: User[];
    type: 'notConfirmed' | 'all';
    onAction: (username: string) => void;
}


function UserTable({ users, type, onAction }: UserTableProps) {
    const navigate = useNavigate();

    const handleRowClick = (username: string) => {
        navigate(`/adminPanel/account/${username}`);
    };

    return (
        <div className="users_div">
            <table className='users_table'>
                <thead className='users_table_head'>
                    <tr className='users_table_inner_th'>
                        <th className='user_table_th'>Username</th>
                        <th className='user_table_th'>Name</th>
                        <th className='user_table_th'>isConfirmed</th>
                        <th className='user_table_th'>Date</th>
                        <th className='user_table_th'>Roles</th>
                        <th className='user_table_th'>Actions</th>
                    </tr>
                </thead>
                <tbody className='users_table_body'>
                    {users.map((user, index) => (
                        <tr key={index} className='users_table_inner' onClick={() => handleRowClick(user.username)}>
                            <td className='user_table_td'>{user.username}</td>
                            <td className='user_table_td'>{user.name}</td>
                            <td className='user_table_td'>{user.accountIsConfirmed ? 'Yes' : 'No'}</td>
                            <td className='user_table_td'>{user.registrationDate === null ? 'No data' : user.registrationDate.toLocaleString()}</td>
                            <td className='user_table_td'>{user.roles.toString()}</td>
                            <td className='user_table_td' onClick={(e) => { e.stopPropagation(); onAction(user.username); }}>
                                {type === 'notConfirmed' ? (
                                    <button className='confirm_button'>Confirm</button>
                                ) : (
                                    <button className='delete_button'>Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
