import { useEffect, useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { usersRef } from "../../firebase/setup";

const PrivateRoom = (props) => {
    const {uid} = props;
    const {id, uidFirstUser, uidSecondUser} = {...props.room}

    const [userFullName, setUserFullName] = useState('');
    const [userPhotoURL, setUserPhotoURL] = useState('');

    useEffect(() => {
        (async() => {
            const userId = uidFirstUser === uid ? uidSecondUser : uidFirstUser;
            const userDoc = await usersRef.doc(userId).get();
            setUserPhotoURL(userDoc.data().photoURL);
            setUserFullName(userDoc.data().fullName);
        }) ();
    }, [])

    return(
        <li className="list-items">
            <Link to={`/room/${id}`}>
                <img className="profile-pic" src={userPhotoURL} referrerPolicy="no-referrer" />
                <p data-testid="private-room-name">{userFullName}</p>
            </Link>
        </li>
    );
}

export default PrivateRoom;