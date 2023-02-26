import { privateRoomsRef, usersRef } from "../../firebase/setup";
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import User from "../map-components/User";
import { useRef, useState } from "react";
import ChatroomCreateDialog from "./ChatroomCreateDialog";
import PrivateRoom from "../map-components/PrivateRoom";

const PrivateChatRoomPage = (props) => {
    const {refference} = props;
    const {uid} = {...props.currentUser};

    const [userId, setUserId] = useState('');

    const dialogRef = useRef();

    const userQuery = usersRef.orderBy('fullName');
    const [users] = useCollectionData(userQuery, {idField: 'id'});

    const privateRoomQuery = privateRoomsRef.orderBy('dateOfLastMessageSent', 'desc');
    const [privateRooms, loading] = useCollection(privateRoomQuery, {idField: 'id'});

    const interactions = users && users.filter(u => u.uid === uid)[0].interactedUsers;

    const getPrivateRoomData = () => {
        let data = [];

        privateRooms.forEach(pr => {
            let id = pr.id;
            let privateRoomData = pr.data();

            let entry = {
                id,
                ...privateRoomData
            };

            data.push(entry);
        });

        let filteredData = data.filter(pr => pr.uidFirstUser === uid || pr.uidSecondUser === uid);
        return filteredData;
    }

    return (
        <div>
            {!loading && 
            <main ref={refference}>
                <h3>Chatrooms:</h3>
                {
                    (privateRooms.docs.length > 0 && privateRooms.docs.map(doc => doc.data()).filter(pr => pr.uidFirstUser === uid || pr.uidSecondUser === uid).length > 0) ? 
                    <ul>
                        {getPrivateRoomData().map((pr, index) => <PrivateRoom key={index} room={pr} uid={uid} />)}
                    </ul> :
                    <h3>You haven't texted anyone yet</h3>
                }
                <p className="caution">Click on any user to send them a message</p>
                <div className="grid-container">
                    {(users && interactions) && users.filter(u => u.uid !== uid && !interactions.includes(u.uid)).map((u, index) => <User key={index} user={u} setUserId={setUserId} dialogRef={dialogRef} />)}
                </div>
                <ChatroomCreateDialog currentUserId={uid} secondUserId={userId} setUserId={setUserId}  reference={dialogRef} />
            </main>}
        </div>
    );
}

export default PrivateChatRoomPage;