import { useEffect, useState } from 'react';
import { api } from '../../app/api/ApiConfig';

import "/src/assets/styles/account.css";

interface User {
    username: string;
    name: string;
    accountIsConfirmed: boolean;
    roles: string[];
    registrationDate: Date;
}


export default function Account() {
    const [userData, setUserData] = useState<User>({
        username: '',
        name: '',
        accountIsConfirmed: false,
        roles: [],
        registrationDate: new Date()
    });

    useEffect(() => {
        api.user.getInformation()
            .then((response) => {
                console.log(response.data);
                console.log(response.data.isConfirmed);
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching trains:', error);
            });
    }, []);


    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_account_text'>Account</h1>
                    <h2 className='upper_username_text'>Hello, {userData.username}</h2>
                    <div className="admin_panel_div">
                        {userData.roles.includes('ADMIN') ? (
                            <a href="/filemanager/account/adminPanel" className="admin_panel_button">Admin Panel</a>
                        ) : null}
                    </div>
                    <span className="account_info">Username: {userData.username}</span>
                    <span className="account_info">Name: {userData.name}</span>
                    <span className="account_info">Account confirmed: {userData.accountIsConfirmed ? 'Yes. Everything is fine.' : 'No. Wait admin to confirm it.'}</span>
                    <span className="account_info">Roles: {userData.roles.toString()}</span>
                    <span className="account_info">Registration date: {userData.registrationDate.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}