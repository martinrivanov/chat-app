import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/setup';
import Welcome from './Welcome';

function Home(){
    const user = useAuthState(auth);

    return user ? <Welcome /> : <p>Home page</p>    
}

export default Home;