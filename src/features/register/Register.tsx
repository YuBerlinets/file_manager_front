// import { useState, ChangeEvent, FormEvent } from 'react';
// import "/src/assets/styles/login_sign_up_styles.css";
// import { api } from '../../app/api/ApiConfig';
// import { useNavigate } from 'react-router-dom';

// interface RegisterData {
//     username: string;
//     name: string;
//     password: string;
// }

// function sentDataToServer(data: RegisterData, setSuccessMessage: (message: string) => void, setErrorMessage: (message: string) => void, navigate: any) {
//     api.user.register(data.username, data.password, data.name)
//         .then((response) => {
//             if (response.status === 200 && response.data.token !== null) {
//                 setSuccessMessage(response.data.message);
//                 setTimeout(() => {
//                     navigate('/login', { replace: true });
//                 }, 1000);
//             } else {
//                 setErrorMessage(response.data.message);
//             }
//         })
//         .catch((error) => {
//             console.error(error);
//             setErrorMessage('An unexpected error occurred');
//         });
// }

// export default function Home() {
//     const navigate = useNavigate();
//     const [registerData, setRegisterData] = useState<RegisterData>({
//         username: '',
//         name: '',
//         password: ''
//     });
//     const [successMessage, setSuccessMessage] = useState<string>('');
//     const [errorMessage, setErrorMessage] = useState<string>('');

//     const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
//         const { name, value } = e.target;
//         setRegisterData({ ...registerData, [name]: value });
//     };

//     const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
//         e.preventDefault();
//         sentDataToServer(registerData, setSuccessMessage, setErrorMessage, navigate);
//     };

//     return (
//         <div className='main_div'>
//             <div className="inner_div">
//                 <h1 className='upper_text'>Sign up for service</h1>
//                 {errorMessage && (
//                     <div className="register_error_div">
//                         <span className="register_error_text">{errorMessage}</span>
//                     </div>
//                 )}
//                 {successMessage && (
//                     <div className="register_success_div">
//                         <span className="register_success_text">{successMessage}</span>
//                     </div>
//                 )}
//                 <div className="login_items">
//                     <form onSubmit={handleSubmit} className='loginForm'>
//                         <input
//                             type="text"
//                             name="username"
//                             value={registerData.username}
//                             onChange={handleInputChange}
//                             placeholder='Username'
//                             className='input_field'
//                             required
//                         />
//                         <br />
//                         <input
//                             type="text"
//                             name="name"
//                             value={registerData.name}
//                             onChange={handleInputChange}
//                             placeholder='Firstname'
//                             className='input_field'
//                             required
//                         />
//                         <br />
//                         <input
//                             type="password"
//                             name="password"
//                             value={registerData.password}
//                             onChange={handleInputChange}
//                             placeholder='Password'
//                             className='input_field'
//                             required
//                         />
//                         <br />
//                         <button type="submit" className='login_button'>Sign Up</button>
//                     </form>
//                 </div>
//                 <a href="/login" className="return_home_button">Return to login</a>
//             </div>
//         </div>
//     );
// }
import { useRegisterForm } from './RegisterForm';
import '/src/assets/styles/login_sign_up_styles.css';

export default function Register() {
    const { registerData, successMessage, errorMessage, handleInputChange, handleSubmit } = useRegisterForm();

    return (
        <div className='main_div'>
            <div className="inner_div">
                <h1 className='upper_text'>Sign up for service</h1>
                {errorMessage && (
                    <div className="register_error_div">
                        <span className="register_error_text">{errorMessage}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="register_success_div">
                        <span className="register_success_text">{successMessage}</span>
                    </div>
                )}
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
                        <button type="submit" className='login_button'>Sign Up</button>
                    </form>
                </div>
                <a href="/login" className="return_home_button">Return to login</a>
            </div>
        </div>
    );
}
