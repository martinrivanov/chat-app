import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/setup';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';

function Home(){
    const [user] = useAuthState(auth);

    return user && user.displayName ? <AuthenticatedApp currentUser={user} /> : <UnauthenticatedApp />    
}

export default Home;