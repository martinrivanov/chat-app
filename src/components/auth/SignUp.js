import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, firestore, storage } from "../../firebase/setup";
import { doc, setDoc } from "firebase/firestore";

const SignUp = (props) => {
    const {signUpRef} = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUpload, setImageUpload] = useState(null);

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, createdUser, signUpLoad, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);

    const [uploadFile] = useUploadFile();

    const handleFirstNameInput = (value) => setFirstName(value);
    const handleLastNameInput = (value) => setLastName(value);
    const handleEmailInput = (value) => setEmail(value);
    const handlePasswordInput = (value) => setPassword(value);
    const handleImageUploadInput = (value) => setImageUpload(value);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                if(error){
                    alert(error.message);
                }
                else{
                    let imageFile = imageUpload ? userCredential.user.uid + '.jpg' : 'default-avatar.png';

                    const storageRef = ref(storage, imageFile);
                    
                    if (imageUpload) {
                        await uploadFile(storageRef, imageUpload);
                    }

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
                        })
                        .then(() => {
                            signInWithEmailAndPassword(email, password);
                        });
                    }
            });
    }

    const handleGoogleButtonClick = () => {
        signInWithGoogle()
            .then(async (userCredential) => {
                await setDoc(doc(firestore, 'users', userCredential.user.uid), {
                    fullName: userCredential.user.displayName,
                    photoURL: userCredential.user.photoURL,
                    uid: userCredential.user.uid,
                    interactedUsers: []
                });
            })
    }

    const hideSignUp = () => {
        signUpRef.current.style.display = 'none';
        handleFirstNameInput('');
        handleLastNameInput('');
        handleEmailInput('');
        handlePasswordInput('');
        handleImageUploadInput(null);
    }

    return(
        <div className="modal" ref={signUpRef}>
            <div className="modal-content">
                <span className="close-btn" onClick={() => hideSignUp()}>&times;</span>
                <form id="modal-form" onSubmit={(e) => handleFormSubmit(e)}>  
                    <input className="auth-input" type="text" name="first-name" id="first-name" placeholder="Enter first name" value={firstName} onChange={(e) => handleFirstNameInput(e.currentTarget.value)} required/>
                    <input className="auth-input" type="text" name="last-name" id="last-name" placeholder="Enter last name" value={lastName} onChange={(e) => handleLastNameInput(e.currentTarget.value)} required/>
                    <input className="auth-input" type="email" name="email" id="email" placeholder="Enter email" value={email} onChange={(e) => handleEmailInput(e.currentTarget.value)} required />
                    <input className="auth-input" type="password" name="password" id="password" placeholder="Enter password" value={password} onChange={(e) => handlePasswordInput(e.currentTarget.value)} required />
                    <input className="auth-input" type="file" name="profile-image" id="profile-image" accept="image/jpg" onChange={(e) => handleImageUploadInput(e.currentTarget.files[0])} />
                    <button className="form-btn">Sign Up</button>
                </form>
                <hr />
                <button className="form-btn google" onClick={() => handleGoogleButtonClick()}>Create account with Google</button>
            </div>
        </div>
    );
}


export default SignUp;