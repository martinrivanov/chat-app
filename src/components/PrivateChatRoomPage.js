import { firestore } from "../firebase/setup";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import User from "./User";

const PrivateChatRoomPage = (props) => {
    const {uid, refference} = props;

    const usersRef = firestore.collection('users');
    const query = usersRef.where('uid', '!=', uid).orderBy('uid');
    const [users] = useCollectionData(query, {idField: 'id'});

    return (
        <main ref={refference}>
            <h3>You haven't texted anyone yet</h3>
            <p>Click on any user to send them a message</p>
            <div className="grid-container">
                {users && users.map((u, index) => <User key={index} user={u} />)}
            </div>
        </main>
    );
}

export default PrivateChatRoomPage;