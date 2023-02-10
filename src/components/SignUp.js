import { useState } from "react";
import { createAccountWithEmailAndPassword } from "../firebase/auth";

function SignUp(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUpload, setImageUpload] = useState(null);

    const handleFirstNameInput = (value) => setFirstName(value);
    const handleLastNameInput = (value) => setLastName(value);
    const handleEmailInput = (value) => setEmail(value);
    const handlePasswordInput = (value) => setPassword(value);
    const handleImageUploadInput = (value) => setImageUpload(value);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        createAccountWithEmailAndPassword(firstName, lastName, email, password, imageUpload)
    }

    const hideSignUp = () => {
        document.getElementById('modal-signup').style.display = 'none';
    }

    return(
        <>
            <div className="modal" id="modal-signup">
                <div className="modal-content">
                    <span className="close-btn" onClick={() => hideSignUp()}>&times;</span>
                    <form id="modal-form" onSubmit={(e) => handleFormSubmit(e)}>  
                        <label for="first-name">First name:</label>
                        <input type="text" name="first-name" id="first-name" value={firstName} onChange={(e) => handleFirstNameInput(e.currentTarget.value)}/>
                        <label for="last-name">Last name:</label>
                        <input type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => handleLastNameInput(e.currentTarget.value)}/>
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => handleEmailInput(e.currentTarget.value)} />
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => handlePasswordInput(e.currentTarget.value)} />
                        <input type="file" name="profile-image" id="profile-image" accept="image/jpg, image/jpeg, image/png" onChange={(e) => handleImageUploadInput(e.currentTarget.files[0])} />
                        <button>Log in</button>
                    </form>
                    <hr />
                    <button>Create account with Google</button>
                </div>
            </div>
        </>
    );
}

export default SignUp;