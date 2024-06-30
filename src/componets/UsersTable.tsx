import React from 'react';
interface NotConfirmedUsers {
    data: NotConfirmedUser[]
}
interface NotConfirmedUser {
    username: string;
    name: string;
    accountIsConfirmed: boolean;
    registrationDate: Date;
    roles: string[];
}

function UserTable({ users }: { users: NotConfirmedUser[] }) {
    return (
        <div className="users_div">
            <table className='users_table'>
                <thead className='users_table_head'>
                    <tr className='users_table_inner'>
                        <th>Username</th>
                        <th>Name</th>
                        <th>isConfirmed</th>
                        <th>Date</th>
                        <th>Roles</th>
                    </tr>
                </thead>
                <tbody className='users_table_body'>
                    {users.map((user, index) => (
                        <tr key={index} className='users_table_inner'>
                            <td className='user_table_td'>{user.username}</td>
                            <td className='user_table_td'>{user.name}</td>
                            <td className='user_table_td'>{user.accountIsConfirmed ? 'Yes' : 'No'}</td>
                            <td className='user_table_td'>{user.registrationDate === null ? 'No data' : user.registrationDate.toLocaleString()}</td>
                            <td className='user_table_td'>{user.roles.toString()}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
