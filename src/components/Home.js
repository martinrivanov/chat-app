import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/setup';
import Welcome from './Welcome';
import Login from './Login';
import SignOut from './SignOut';

function Home(){
    const [user] = useAuthState(auth);

    return user ? (
        <div>
            <h1>Welcome {user.displayName}</h1>
            <SignOut />
        </div>
    ) : <Welcome />    
}

export default Home;