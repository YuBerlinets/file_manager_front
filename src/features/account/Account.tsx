import { useEffect, useState } from 'react';
import { api } from '../../app/api/ApiConfig';

import "/src/assets/styles/account.css";

interface User {
    username: string;
    name: string;
    accountConfirmed: boolean;
    roles: string[];

}


export default function Account() {
    const [userData, setUserData] = useState<User>({
        username: '',
        name: '',
        accountConfirmed: false,
        roles: []
    });

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await api.user.getInformation();
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);


    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_text'>Account</h1>
                    <h2 className='upper_text'>{userData.username}</h2>
                    <span className="account_info">Username: {userData.username}</span>
                    <span className="account_info">Name: {userData.name}</span>
                    <span className="account_info">Account confirmed: {userData.accountConfirmed}</span>
                    <span className="account_info">Roles: {userData.roles}</span>

                </div>
            </div>
        </div>
    );
}