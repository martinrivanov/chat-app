import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/setup';
import Welcome from './Welcome';
import Login from './Login';
import SignOut from './SignOut';
import useSharedLoadingState from '../hooks/useSharedLoadingState';

function Home(){
    const [user] = useAuthState(auth);
    //const [isLoading, setLoading] = useSharedLoadingState();

    return user ? (
        <div>
            <img src={user.photoURL} />
            <h1>Welcome {user.displayName}</h1>
            <SignOut />
        </div>
    ) : <Welcome />    
}

export default Home;