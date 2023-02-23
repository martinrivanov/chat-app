import { firestore } from "../../firebase/setup";
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import User from "../map-components/User";
import { useEffect, useRef, useState } from "react";
import ChatroomCreateDialog from "./ChatroomCreateDialog";
import PrivateRoom from "../map-components/PrivateRoom";

const PrivateChatRoomPage = (props) => {
    const {refference} = props;
    const {uid} = {...props.currentUser};

    const [userId, setUserId] = useState('');

    const dialogRef = useRef();

    const usersRef = firestore.collection('users');
    const userQuery = usersRef.orderBy('fullName');
    const [users] = useCollectionData(userQuery, {idField: 'id'});

    const privateRoomsRef = firestore.collection('private-rooms');
    const privateRoomQuery = privateRoomsRef.orderBy('dateOfLastMessageSent');
    const [privateRooms, loading] = useCollection(privateRoomQuery, {idField: 'id'});

    const interactions = users && users.filter(u => u.uid === uid)[0].interactedUsers;

    useEffect(() => {
        console.log(interactions);
    }, [interactions])

    return (
        <div>
            {!loading && 
            <main ref={refference}>
                {
                    (privateRooms.docs.length > 0 && privateRooms.docs.map(doc => doc.data()).filter(pr => pr.uidFirstUser === uid || pr.uidSecondUser === uid).length > 0) ? 
                    privateRooms.docs.map(doc => doc.data()).map((pr, index) => <PrivateRoom key={index} room={pr} usersRef={usersRef} uid={uid} />) :
                    <h3>You haven't texted anyone yet</h3>
                }
                <p>Click on any user to send them a message</p>
                <div className="grid-container">
                    {(users && interactions) && users.filter(u => u.uid !== uid && !interactions.includes(u.uid)).map((u, index) => <User key={index} user={u} setUserId={setUserId} dialogRef={dialogRef} />)}
                </div>
                <ChatroomCreateDialog currentUserId={uid} secondUserId={userId} setUserId={setUserId} privateRoomsRef={privateRoomsRef} reference={dialogRef} usersRef={usersRef} />
            </main>}
        </div>
    );
}

export default PrivateChatRoomPage;