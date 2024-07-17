import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../app/api/ApiConfig';

interface User {
    username: string;
    name: string;
    accountIsConfirmed: boolean;
    registrationDate: Date;
    roles: string[];
}

// const availableRoles = ['ADMIN', 'USER', 'FAMILY', 'GUEST', 'FRIEND'];

export default function UserDetails() {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [availableRoles, setAvailableRoles] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!username) return console.error('No username provided');
                const response = await api.admin.getUserByUsername(username);
                setUser(response.data);
                setSelectedRoles(response.data.roles);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchAvailableRoles = async () => {
            const roles = await api.admin.getAllRoles();
            console.log(roles.data);
            setAvailableRoles(roles.data);
        }

        fetchUserDetails();
        fetchAvailableRoles();
    }, [username]);

    const handleRoleChange = (role: string) => {
        setSelectedRoles(prevRoles =>
            prevRoles.includes(role) ? prevRoles.filter(r => r !== role) : [...prevRoles, role]
        );
    };

    const handleSubmit = async () => {
        try {
            if (!username) return console.error('No username provided');
            await api.admin.updateRoles(username, selectedRoles);
            alert('Roles updated successfully');
        } catch (error) {
            console.log(error);
            alert('Failed to update roles');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_account_text'>User Details</h1>
                    <div className="user_details_info">
                        <p className='account_info_inner'>Username: <span className='account_info_field'>{user.username}</span></p>
                        <p className='account_info_inner'>Name:<span className='account_info_field'> {user.name}</span></p>
                        <p className='account_info_inner'>Account Confirmed:<span className='account_info_field'> {user.accountIsConfirmed ? 'Yes' : 'No'}</span></p>
                        <p className='account_info_inner'>Registration Date:<span className='account_info_field'>{user.registrationDate.toLocaleString()}</span></p>
                        <p className='account_info_inner'>Roles:</p>
                        <div className='account_info_inner'>
                            {availableRoles.map(role => (
                                <div key={role}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles.includes(role)}
                                            onChange={() => handleRoleChange(role)}
                                        />
                                        {role}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleSubmit} className='user_details_back_button'>Update Roles</button>
                    {!user.accountIsConfirmed && <span className='user_details_account_confirm_alert'>Account is not confirm yet</span>}
                    {!user.accountIsConfirmed && <button onClick={() => alert('Not implemented yet')} className='user_details_confirm_button'>Confirm User</button>}
                    <button onClick={() => window.history.back()} className='user_details_back_button'>Back</button>
                </div>
            </div>
        </div>
    );
}
