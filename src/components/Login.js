import firebase from "firebase/compat/app";
import { auth } from "../firebase/setup";

function Login(){
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return <button onClick={signInWithGoogle}>Sign in with Google</button>
}

export default Login;