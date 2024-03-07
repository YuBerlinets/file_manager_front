import { useState, ChangeEvent, FormEvent } from 'react';
import "/src/assets/styles/login_sign_up_styles.css"
import { api } from '../../app/api/ApiConfig';
import { useNavigate } from 'react-router-dom';

interface RegisterData {
    username: string;
    name: string;
    password: string;
}

function succesfullRegister(message: string, navigate: any) {
    let register_error_div = document.querySelector('.register_success_div') as HTMLDivElement;
    let register_error_text = document.querySelector('.register_success_text') as HTMLSpanElement;
    if (register_error_div !== null && register_error_text !== null) {
        register_error_div.style.display = 'flex';
        register_error_text.innerText = message;
    } else {
        console.log('Error')
    }
    setTimeout(() => {
        navigate('/login', { replace: true });
    }, 2000);
}

function failedRegister(message: string) {
    let register_error_div = document.querySelector('.register_error_div') as HTMLDivElement;
    let register_error_text = document.querySelector('.register_error_text') as HTMLSpanElement;
    if (register_error_div !== null && register_error_text !== null) {
        register_error_div.style.display = 'flex';
        register_error_text.innerText = message;
    } else {
        console.log('Error')
    }
}

function sentDataToServer(data: RegisterData, navigate: any) {
    api.user.register(data.username, data.password, data.name)
        .then((response) => {
            if (response.status === 200 && response.data.token !== null) {
                succesfullRegister(response.data.message, navigate);
            } else {
                failedRegister(response.data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export default function Home() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState<RegisterData>({
        username: '',
        name: '',
        password: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        console.log('Register data submitted:', registerData);
    };

    return (
        <div className='main_div'>
            <div className="inner_div">
                <h1 className='upper_text' >Sign up for service</h1>
                <div className="register_error_div">
                    <span className="register_error_text"></span>
                </div>
                <div className="register_success_div">
                    <span className="register_success_text"></span>
                </div>
                <div className="login_items">
                    <form onSubmit={handleSubmit} className='loginForm'>
                        <input
                            type="text"
                            name="username"
                            value={registerData.username}
                            onChange={handleInputChange}
                            placeholder='Username'
                            className='input_field'
                            required
                        />
                        <br />
                        <input
                            type="text"
                            name="name"
                            value={registerData.name}
                            onChange={handleInputChange}
                            placeholder='Firstname'
                            className='input_field'
                            required
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={handleInputChange}
                            placeholder='Password'
                            className='input_field'
                            required
                        />
                        <br />
                        <button type="submit" className='login_button'
                            onClick={() => {
                                sentDataToServer(registerData, navigate)
                            }}>Sign Up</button>
                    </form>
                </div>
                <a href="/login" className="return_home_button">Return to login</a>

            </div>
        </div>

    );
}
