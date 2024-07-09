import { useState, ChangeEvent, FormEvent } from 'react';
import "/src/assets/styles/login_sign_up_styles.css";
import { api } from '../../app/api/ApiConfig';

interface LoginData {
    username: string;
    password: string;
}

function sentDataToServer(data: LoginData, setError: (message: string) => void) {
    api.user.authenticate(data.username, data.password)
        .then((response) => {
            console.log(response);
            console.log(response.status);
            if (response.status === 200 && response.data.token !== null) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', data.username);
                window.location.reload();
            }
        })
        .catch((error) => {
            console.error(error);
            switch (error.response.status) {
                case 404:
                case 401:
                    setError('Invalid username or password');
                    break;
                case 403:
                    setError('Your account is not confirmed yet! Please wait for confirmation!');
                    break;
                default:
                    console.error(error);
                    setError('An unexpected error occurred');
            }
        });
}

export default function Login() {
    const [loginData, setLoginData] = useState<LoginData>({
        username: '',
        password: '',
    });
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (loginData.username === '' || loginData.password === '') {
            loginDataEmpty();
        } else {
            sentDataToServer(loginData, setError);
        }
    };

    const loginDataEmpty = (): void => {
        let username_field = document.getElementById('username_field') as HTMLInputElement;
        let password_field = document.getElementById('password_field') as HTMLInputElement;

        if (username_field.value === '') {
            username_field.style.border = '1px solid #b30000';
        } else {
            username_field.style.border = 'none';
            username_field.style.outline = 'none';
        }

        if (password_field.value === '') {
            password_field.style.border = '1px solid #b30000';
        } else {
            password_field.style.border = '1px solid #fff';
            password_field.style.outline = 'none';
            password_field.style.border = 'none';
        }

        setError('Fill all the fields');
    };

    return (
        <div className='main_div'>
            <div className="inner_div">
                <h1 className='upper_text'>Login to Service</h1>
                <div className="login_items">
                    {error && (
                        <div className="login_error" id='login_error_id'>
                            <span className="login_error_text" id='login_error_text_id'>{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className='loginForm'>
                        <input
                            type="text"
                            name="username"
                            value={loginData.username}
                            onChange={handleInputChange}
                            placeholder='Username'
                            className='input_field'
                            id='username_field'
                            required
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                            placeholder='Password'
                            className='input_field'
                            id='password_field'
                            required
                        />
                        <br />
                        <button type="submit" className='login_button'>Login</button>
                    </form>
                </div>

                <span className="register_page_text">Don't have account yet?
                    <a href="/register" className="register_page_link">Sign up!</a>
                </span>
            </div>
        </div>
    );
}
