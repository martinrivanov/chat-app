import { useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase/setup";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    const handleEmailInput = (value) => setEmail(value);
    const handlePasswordInput = (value) => setPassword(value);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    const hideLogIn = () => {
        document.getElementById('modal-login').style.display = 'none';
        handleEmailInput('');
        handlePasswordInput('');
    }

    return (
        <>
            <div className="modal" id="modal-login">
                <div className="modal-content">
                    <span className="close-btn" onClick={() => hideLogIn()}>&times;</span>
                    <form id="modal-form" onSubmit={(e) => handleFormSubmit(e)}>  
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => handleEmailInput(e.currentTarget.value)} required />
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => handlePasswordInput(e.currentTarget.value)} required />
                        <button>Log In</button>
                    </form>
                    <hr />
                    <button onClick={() => signInWithGoogle()}>Log in with Google</button>
                </div>
            </div>
        </>
    )
}

export default Login;