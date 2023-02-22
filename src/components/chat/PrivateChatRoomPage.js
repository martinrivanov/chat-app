import { firestore } from "../../firebase/setup";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import User from "../map-components/User";
import { useRef, useState } from "react";

const PrivateChatRoomPage = (props) => {
    const {uid, refference} = props;

    const [userId, setUserId] = useState('');

    const btnRef = useRef();

    const usersRef = firestore.collection('users');
    const userQuery = usersRef.where('uid', '!=', uid).orderBy('uid');
    const [users] = useCollectionData(userQuery, {idField: 'id'});

    const privateRoomsRef = firestore.collection('private-rooms');
    const privateRoomQuery = privateRoomsRef.orderBy('dateOfLastMessageSent');
    const [privateRooms, loading] = useCollectionData(privateRoomQuery, {idField: 'id'});

    return (
        <div>
            {!loading && 
            <main ref={refference}>
                {
                    privateRooms.length > 0 && privateRooms.filter(pr => pr.uidFirstUser === uid || pr.uidSecondUser === uid) > 0 ? 
                    <h3>You have chatrooms</h3> :
                    <h3>You haven't texted anyone yet</h3>
                }
                <p>Click on any user to send them a message</p>
                <div className="grid-container">
                    {users && users.map((u, index) => <User key={index} user={u} setUserId={setUserId} btnRef={btnRef}/>)}
                </div>
                <button style={{display: "none"}} ref={btnRef} onClick={() => console.log(userId)}>Test</button>
            </main>}
        </div>
    );
}

export default PrivateChatRoomPage;