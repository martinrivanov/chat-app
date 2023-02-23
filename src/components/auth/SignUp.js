import { useState } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, firestore, storage } from "../../firebase/setup";
import { doc, setDoc } from "firebase/firestore";

function SignUp(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUpload, setImageUpload] = useState(null);

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);

    const [uploadFile] = useUploadFile();

    const handleFirstNameInput = (value) => setFirstName(value);
    const handleLastNameInput = (value) => setLastName(value);
    const handleEmailInput = (value) => setEmail(value);
    const handlePasswordInput = (value) => setPassword(value);
    const handleImageUploadInput = (value) => setImageUpload(value);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                const storageRef = ref(storage, userCredential.user.uid + '.jpg');
                await uploadFile(storageRef, imageUpload);
                const photoURL = await getDownloadURL(storageRef);

                await setDoc(doc(firestore, 'users', userCredential.user.uid), {
                    fullName: `${firstName} ${lastName}`,
                    photoURL,
                    uid: userCredential.user.uid,
                    interactedUsers: []
                });

                updateProfile({displayName: `${firstName} ${lastName}`, photoURL})
                    .then(() => {
                        auth.signOut()
                            .then(() => {
                                signInWithEmailAndPassword(email, password)
                                    .then(() => {
                                        console.log(auth.currentUser);
                                    });
                            });
                    })
            });
    }

    const handleGoogleButtonClick = async () => {
        signInWithGoogle()
            .then(async (userCredential) => {
                await setDoc(doc(firestore, 'users', userCredential.user.uid), {
                    fullName: userCredential.user.displayName,
                    photoURL: userCredential.user.photoURL,
                    uid: userCredential.user.uid,
                    chatRooms: null
                });
            })
    }

    const hideSignUp = () => {
        document.getElementById('modal-signup').style.display = 'none';
        handleFirstNameInput('');
        handleLastNameInput('');
        handleEmailInput('');
        handlePasswordInput('');
        handleImageUploadInput(null);
    }

    return(
        <>
            <div className="modal" id="modal-signup">
                <div className="modal-content">
                    <span className="close-btn" onClick={() => hideSignUp()}>&times;</span>
                    <form id="modal-form" onSubmit={(e) => handleFormSubmit(e)}>  
                        <label for="first-name">First name:</label>
                        <input type="text" name="first-name" id="first-name" value={firstName} onChange={(e) => handleFirstNameInput(e.currentTarget.value)} required/>
                        <label for="last-name">Last name:</label>
                        <input type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => handleLastNameInput(e.currentTarget.value)} required/>
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => handleEmailInput(e.currentTarget.value)} required />
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => handlePasswordInput(e.currentTarget.value)} required />
                        <input type="file" name="profile-image" id="profile-image" accept="image/jpg" onChange={(e) => handleImageUploadInput(e.currentTarget.files[0])} />
                        <button>Sign Up</button>
                    </form>
                    <hr />
                    <button onClick={() => handleGoogleButtonClick()}>Create account with Google</button>
                </div>
            </div>
        </>
    );
}

export default SignUp;