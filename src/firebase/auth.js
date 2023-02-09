import firebase from "firebase/compat/app";
import { auth } from "../firebase/setup";

const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

const signOut = () => auth.signOut();

export {signInWithGoogle, signOut};