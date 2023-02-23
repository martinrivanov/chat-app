import { useEffect, useState } from "react";

const PrivateRoom = (props) => {
    const {uidFirstUser, uidSecondUser} = {...props.room}
    const {usersRef, uid} = props;

    const [userPhotoURL, setUserPhotoURL] = useState('');

    useEffect(() => {
        (async() => {
            const userId = uidFirstUser === uid ? uidSecondUser : uidFirstUser;
            const userDoc = await usersRef.doc(userId).get();
            setUserPhotoURL(userDoc.data().photoURL)
        }) ();
    }, [])

    return(
        <p>{userPhotoURL}</p>
    );
}

export default PrivateRoom;