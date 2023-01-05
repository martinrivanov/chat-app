import { useNavigate } from "react-router";

function Welcome(){
    const navigate = useNavigate();

    return (
        <div>
            <div className="welcome-header">
                <h1>Welcome to ChatApp</h1>
                <p>Be able to connect with others</p>
            </div>

            <div>
                <button onClick={() => navigate('/login')}>Sign in</button>
                <p>If you don't have an account, click <a href="#">here</a></p>
            </div>
        </div>
    )
}

export default Welcome;