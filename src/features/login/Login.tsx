import { useState, ChangeEvent, FormEvent } from 'react';
import "/src/assets/styles/login_sign_up_styles.css";
import { api, setAuthToken } from '../../app/api/ApiConfig';
import { Navigate, useNavigate } from 'react-router-dom';


interface LoginData {
    username: string;
    password: string;
}




function sentDataToServer(data: LoginData, navigate: any) {

    api.user.authenticate(data.username, data.password)
        .then((response) => {
            if (response.status === 200 && response.data.token !== null) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', data.username);
                console.log(localStorage.getItem('token'));
                console.log(localStorage.getItem('username'));
                navigate = useNavigate();
                navigate('/manager', { replace: true });
            }
            else {
                let login_error_div = document.querySelector('.login_error') as HTMLDivElement;
                let login_error_text = document.querySelector('.login_error_text') as HTMLSpanElement;
                if (login_error_div !== null && login_error_text !== null) {
                    login_error_div.style.display = 'flex';
                    login_error_text.innerText = 'Invalid username or password';
                } else {
                    console.log('Error')
                }
            }
        })
        .catch((error) => {
            if (error.response.status === 403) {
                let login_error_div = document.querySelector('.login_error') as HTMLDivElement;
                let login_error_text = document.querySelector('.login_error_text') as HTMLSpanElement;
                if (login_error_div !== null && login_error_text !== null) {
                    login_error_div.style.display = 'flex';
                    login_error_text.innerText = 'Invalid username or password';
                }
            }
            else {

                console.error(error);
            }
        });

}

export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<LoginData>({
        username: '',
        password: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    const loginDataEmpty = (): void => {
        let login_error_div = document.querySelector('.login_error') as HTMLDivElement;
        let login_error_text = document.querySelector('.login_error_text') as HTMLSpanElement;
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

        if (login_error_div !== null && login_error_text !== null) {
            login_error_div.style.display = 'flex';
            login_error_text.innerText = 'Fill all the fields';
        } else {
            console.log('Error')
        }
    };

    return (
        <div className='main_div'>
            <div className="inner_div">
                <h1 className='upper_text' >Login to Service</h1>
                <div className="login_items">
                    <div className="login_error" id='login_error_id'>
                        <span className="login_error_text" id='login_error_text_id'></span>
                    </div>
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
                        <button type="submit" className='login_button'
                            onClick={() => {
                                if (loginData.username === '' || loginData.password === '') {
                                    loginDataEmpty()
                                } else {
                                    sentDataToServer(loginData, navigate)
                                }
                            }}>Login</button>
                    </form>
                </div>

                <span className="register_page_text">Don't have account yet?
                    <a href="/register" className="register_page_link">Sign up!</a>
                </span>
            </div>
        </div>

    );
}
