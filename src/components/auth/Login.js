import { useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/setup";

function Login(props){
    const {loginRef} = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signInWithEmailAndPassword, user, load, error] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    const handleEmailInput = (value) => setEmail(value);
    const handlePasswordInput = (value) => setPassword(value);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
        
        if(error) {
            alert(error.message);
        }
    }

    const hideLogIn = () => {
        loginRef.current.style.display = 'none';
        handleEmailInput('');
        handlePasswordInput('');
    }

    return (
        <div className="modal" ref={loginRef}>
            <div className="modal-content">
                <span className="close-btn" onClick={() => hideLogIn()}>&times;</span>
                <form id="modal-form" onSubmit={(e) => handleFormSubmit(e)}>  
                    <input className="auth-input" type="email" name="email" id="email" placeholder="Enter email" value={email} onChange={(e) => handleEmailInput(e.currentTarget.value)} required />
                    <input className="auth-input" type="password" name="password" id="password" value={password} placeholder="Enter password" onChange={(e) => handlePasswordInput(e.currentTarget.value)} required />
                    <button className="form-btn">Log In</button>
                </form>
                <hr />
                <button className="form-btn google" onClick={() => signInWithGoogle()}>Log in with Google</button>
            </div>
        </div>
    )
}

export default Login;