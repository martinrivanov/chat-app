import { useState } from "react";
import { signInWithGoogle } from "../firebase/auth";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = (value) => setEmail(value);
    const handlePasswordInput = (value) => setPassword(value);

    const hideLogIn = () => {
        document.getElementById('modal-login').style.display = 'none';
    }

    return (
        <>
            <div className="modal" id="modal-login">
                <div className="modal-content">
                    <span className="close-btn" onClick={() => hideLogIn()}>&times;</span>
                    <form id="modal-form">  
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => handleEmailInput(e.currentTarget.value)} />
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => handlePasswordInput(e.currentTarget.value)} />
                        <button>Log in</button>
                    </form>
                    <hr />
                    <button onClick={() => signInWithGoogle()}>Log in with Google</button>
                </div>
            </div>
        </>
    )
}

export default Login;