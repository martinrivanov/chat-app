import { auth } from "../../firebase/setup";
import { useSignOut } from "react-firebase-hooks/auth";

function SignOut() {
    const [signOut] = useSignOut(auth);

    return auth.currentUser && (
        <button onClick={() => signOut()}>Sign Out</button>
    );
}

export default SignOut;