import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <li>
            <Link to={`/room/${id}`}>
                <img src={userPhotoURL} referrerPolicy="no-referrer" />
                <p>{userFullName}</p>
            </Link>
        </li>
    );
}

export default PrivateRoom;