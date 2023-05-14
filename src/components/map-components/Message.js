import { useEffect, useState } from "react";
import { auth, usersRef } from "../../firebase/setup";

const Message = (props) => {
    const {content, uid} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const [userPhotoURL, setUserPhotoURL] = useState('');

    useEffect(() => {
        (async() => {
            const userDoc = await usersRef.doc(uid).get();
            setUserPhotoURL(userDoc.data().photoURL);
        }) ();
    }, [])

    return (
        <div data-testid="message" className={`message ${messageClass}`}>
            <img className="message-photo" src={userPhotoURL} referrerPolicy="no-referrer"/>
            <p>{content}</p>
        </div>
    );
}

export default Message;