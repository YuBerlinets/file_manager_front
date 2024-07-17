import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../app/api/ApiConfig';

interface RegisterData {
    username: string;
    name: string;
    password: string;
}

interface UseRegisterFormReturn {
    registerData: RegisterData;
    successMessage: string;
    errorMessage: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState<RegisterData>({
        username: '',
        name: '',
        password: ''
    });
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await api.user.register(registerData.username, registerData.password, registerData.name);
            if (response.status === 200 && response.data.token !== null) {
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 1000);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An unexpected error occurred');
        }
    };

    return { registerData, successMessage, errorMessage, handleInputChange, handleSubmit };
};
