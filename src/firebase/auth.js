import firebase from "firebase/compat/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import 'firebase/storage';
import { auth, storage } from "../firebase/setup";

const createAccountWithEmailAndPassword = async (firstName, lastName, email, password, profileImage) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            updateNameAndProfilePicture(userCredential.user, firstName, lastName, profileImage);
        })
}

const updateNameAndProfilePicture = async (currentUser, firstName, lastName, profileImage) => {
    const fileRef = ref(storage, currentUser.uid + '.jpg');

    const snapshot = await uploadBytes(fileRef, profileImage);
    const photoURL = await getDownloadURL(fileRef);

    await currentUser.updateProfile({displayName: `${firstName} ${lastName}`, photoURL})
}

const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

const signOut = () => auth.signOut();

export {createAccountWithEmailAndPassword, signInWithGoogle, signOut};