import { firestore } from "../firebase/setup";
import SignOut from "./SignOut";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import User from "./User";

const AuthenticatedApp = (props) => {
    const {currentUser} = props;

    const usersRef = firestore.collection('users');
    const query = usersRef.where('uid', '!=', currentUser.uid).orderBy('uid');
    const [users] = useCollectionData(query, {idField: 'id'});

    return (
        <main>
            <div>
                <img className="profile-img" src={currentUser.photoURL}/>
                <SignOut />
            </div>
            <div>
                <h3>You haven't texted anyone yet</h3>
                <p>Click on any user to send them a message</p>
                <div className="grid-container">
                    {users && users.map((u, index) => <User key={index} user={u} />)}
                </div>
            </div>
        </main>
    );
}

export default AuthenticatedApp;