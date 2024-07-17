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

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState<boolean>();

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


    const handlePasswordUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {


            const response = await api.admin.updatePassword(password, passwordRepeat);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setError(event.target.value !== passwordRepeat);
    };

    const handlePasswordRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordRepeat(event.target.value);
        setError(event.target.value !== password);
    };

    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_account_text'>Account</h1>
                    <span className='upper_username_text'>Hello, <span className='username_upper'>{userData.username}.</span></span>
                    <div className="admin_panel_div">
                        {userData.roles.includes('ADMIN') ? (
                            <a href="/account/adminPanel" className="admin_panel_button">Admin Panel</a>
                        ) : null}
                    </div>
                    <div className="account_info">
                        {/* <span className="account_info_inner">Username: <span className='account_info_field'>{userData.username}</span></span> */}
                        <span className="account_info_inner">Name: <span className='account_info_field'>{userData.name}</span></span>
                        <span className="account_info_inner">Account confirmed: <span className='account_info_field'>{userData.accountIsConfirmed ? 'Yes. Everything is fine.' : 'No. Wait admin to confirm it.'}</span></span>
                        <span className="account_info_inner">Roles: <span className='account_info_field'>{userData.roles.toString()}</span></span>
                        <span className="account_info_inner">Registration date: <span className='account_info_field'>{userData.registrationDate.toLocaleString()}</span></span>
                    </div>
                    <div className="update_password_div">
                        <h2 className="update_password_title">Update password</h2>
                        {error ? <span className='error_message'>Passwords do not match</span> : null}
                        <form onSubmit={handlePasswordUpdate} className='update_password_form'>
                            <label htmlFor="password" className='password_input_label'>Enter password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className='password_input'
                            />
                            <label htmlFor="password_repeat" className='password_input_label'>Enter password</label>
                            <input
                                type="password"
                                name="password_repeat"
                                id="password_repeat"
                                value={passwordRepeat}
                                onChange={handlePasswordRepeatChange}
                                className='password_input'
                            />
                            <button type="submit" className="update_password_button">
                                Update password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}