import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/setup';
import GuestScreen from './GuestScreen';
import LoggedInScreen from './LoggedInScreen';

function Home(){
    const [user] = useAuthState(auth);

    return user && user.displayName ? <LoggedInScreen currentUser={user} /> : <GuestScreen />    
}

export default Home;