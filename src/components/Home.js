import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/setup';
import Welcome from './Welcome';
import SignOut from './SignOut';

function Home(){
    const [user] = useAuthState(auth);
    //const [isLoading, setLoading] = useSharedLoadingState();

    return user && user.displayName ? (
        <div>
            <img src={user.photoURL} />
            <h1>Welcome {user.displayName}</h1>
            <SignOut />
        </div>
    ) : <Welcome />    
}

export default Home;