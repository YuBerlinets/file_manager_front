import { useLoginForm } from './LoginForm';
import '/src/assets/styles/login_sign_up_styles.css';

export default function Login() {
    const { loginData, error, handleInputChange, handleSubmit } = useLoginForm();

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
                <span className="register_page_text">Don't have an account yet?
                    <a href="/register" className="register_page_link">Sign up!</a>
                </span>
            </div>
        </div>
    );
}
