function Welcome(){
    return (
        <div>
            <div className="welcome-header">
                <h1>Welcome to ChatApp</h1>
                <p>Be able to connect with others</p>
            </div>

            <div>
                <button>Sign in</button>
                <p>If you don't have an account, click <a href="#">here</a></p>
            </div>
        </div>
    )
}

export default Welcome;