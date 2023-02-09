import { auth } from "../firebase/setup";
import { signOut } from "../firebase/auth"

function SignOut(){
    return auth.currentUser && (
        <button onClick={() => signOut()}>Sign Out</button>
    );
}

export default SignOut;