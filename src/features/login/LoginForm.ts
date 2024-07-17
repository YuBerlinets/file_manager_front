import { useState, ChangeEvent, FormEvent } from 'react';
import { api } from '../../app/api/ApiConfig';

interface LoginData {
    username: string;
    password: string;
}

interface UseLoginFormReturn {
    loginData: LoginData;
    error: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const useLoginForm = (): UseLoginFormReturn => {
    const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (loginData.username === '' || loginData.password === '') {
            setError('Fill all the fields');
            return;
        }

        try {
            const response = await api.user.authenticate(loginData.username, loginData.password);
            if (response.status === 200 && response.data.token !== null) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', loginData.username);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                window.location.reload();
            }
        } catch (error: any) {
            console.error(error);
            switch (error.response?.status) {
                case 404:
                case 401:
                    setError('Invalid username or password');
                    break;
                case 403:
                    setError('Your account is not confirmed yet! Please wait for confirmation!');
                    break;
                default:
                    setError('An unexpected error occurred');
            }
        }
    };

    return { loginData, error, handleInputChange, handleSubmit };
};
