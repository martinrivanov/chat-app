import { useRef } from 'react';
import '../App.css';
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const UnauthenticatedApp = () => {
    const loginRef = useRef();
    const signUpRef = useRef();

    const showLogIn = () => {
        loginRef.current.style.display = 'block';
    }

    const showSignUp = () => {
        signUpRef.current.style.display = 'block';
    }

    return (
        <div>
            <div className="welcome-header">
                <h1>Welcome to ChatApp</h1>
                <p>Be able to connect with others</p>
            </div>

            <Login loginRef={loginRef} />
            <SignUp signUpRef={signUpRef} />

            <div className="auth-btns">
                <button onClick={() => showLogIn()}>Log in</button>
                <button onClick={() => showSignUp()}>Sign up</button>
            </div>
        </div>
    )
}

export default UnauthenticatedApp;