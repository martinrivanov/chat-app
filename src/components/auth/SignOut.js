import { auth } from "../../firebase/setup";
import { useSignOut } from "react-firebase-hooks/auth";

const SignOut = () => {
    const [signOut] = useSignOut(auth);

    return auth.currentUser && (
        <button className="sign-out" onClick={() => signOut()}>Sign Out</button>
    );
}

export default SignOut;