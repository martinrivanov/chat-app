import firebase from "firebase/compat/app";
import { useReducer, useState } from "react";
import { auth } from "../firebase/setup";

function Login(){
    const signIn = (state, action) => {

    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, dispatcher] = useReducer(signIn, {});

    const handleEmailInput = (value) => setEmail(value);
    const handlePasswordInput = (value) => setPassword(value);


    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    const hideLogIn = () => {
        document.getElementsByClassName('modal')[0].style.display = 'none';
    }

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <span className="close-btn" onClick={() => hideLogIn()}>&times;</span>
                    <form id="modal-form">  
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => handleEmailInput(e.currentTarget.value)} />
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => handlePasswordInput(e.currentTarget.value)} />
                        <button>Log in</button>
                        <hr />
                        <button>Create Google Account</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;