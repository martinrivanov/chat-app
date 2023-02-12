import '../App.css';
import Login from "./Login";
import SignUp from "./SignUp";

function Welcome(){
    const showLogIn = () => {
        document.getElementById('modal-login').style.display = 'block';
    }

    const showSignUp = () => {
        document.getElementById('modal-signup').style.display = 'block';
    }

    return (
        <div>
            <div className="welcome-header">
                <h1>Welcome to ChatApp</h1>
                <p>Be able to connect with others</p>
            </div>

            <Login />
            <SignUp />

            <div className="auth-btns">
                <button onClick={() => showLogIn()}>Log in</button>
                <button onClick={() => showSignUp()}>Sign up</button>
            </div>
        </div>
    )
}

export default Welcome;