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

export default function UserDetails() {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!username) return console.error('No username provided');
                const response = await api.user.getUserByUsername(username);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserDetails();
    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_text'>User Details</h1>
                    <div className="user_info">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Account Confirmed:</strong> {user.accountIsConfirmed ? 'Yes' : 'No'}</p>
                        <p><strong>Registration Date:</strong> {user.registrationDate.toLocaleString()}</p>
                        <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
                    </div>
                    <button onClick={() => window.history.back()} className='back_button'>Back</button>
                </div>
            </div>
        </div>
    );
}
