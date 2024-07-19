import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../app/api/ApiConfig';
import { Popper, Button, Box, Typography, ClickAwayListener } from '@mui/material';

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
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [availableRoles, setAvailableRoles] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [newPassword, setNewPassword] = useState<string | null>(null);

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
        fetchUserDetails();
    }, [username]);

    useEffect(() => {
        const fetchAvailableRoles = async () => {
            const roles = await api.admin.getAllRoles();
            setAvailableRoles(roles.data);
        };
        fetchAvailableRoles();
    }, []);

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

    const handleConfirm = async () => {
        try {
            if (!username) return console.error('No username provided');
            await api.admin.confirmUser(username);
            setUser((prevUser) => prevUser ? { ...prevUser, accountIsConfirmed: true } : null);
            alert('User confirmed successfully');
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            if (!username) return console.error('No username provided');
            await api.admin.deleteUser(username);
            alert('User deleted successfully');
            window.history.back();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setNewPassword(null);  // Reset the new password display on button click
    };

    const handleResetPassword = async () => {
        try {
            if (!username) return console.error('No username provided');
            const response = await api.admin.resetPassword(username);
            setNewPassword(response.data);
        } catch (error) {
            console.log(error);
            setNewPassword('Failed to reset password');
        }
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'reset-password-popper' : undefined;

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main_div'>
            <div className="account_container">
                <div className="account_div">
                    <h1 className='upper_account_text'>User Details</h1>
                    <div className="user_details_info">
                        {!user.accountIsConfirmed && <span className='user_details_account_confirm_alert'>Account is not confirmed yet</span>}
                        {!user.accountIsConfirmed && <button onClick={handleConfirm} className='user_details_confirm_button'>Confirm User</button>}
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
                    <button onClick={handleDelete} className='user_details_delete_button'>Delete User</button>
                    <button onClick={handleClick} className='user_details_reset_password_button'>Reset Password</button>
                    <Popper id={id} open={open} anchorEl={anchorEl} className='reset_password_popper'>
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <Box className='reset_password_box'>
                                {newPassword === null ? (
                                    <>
                                        <Typography>Are you sure you want to reset the password for this user?</Typography>
                                        <button onClick={handleResetPassword} className='reset_password_button'>Confirm</button>
                                    </>
                                ) : (
                                    <Typography>Password reset successfully: {newPassword}</Typography>
                                )}
                            </Box>
                        </ClickAwayListener>
                    </Popper>
                    <button onClick={() => window.history.back()} className='user_details_back_button'>Back</button>
                </div>
            </div>
        </div>
    );
}
