import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useLocation, useNavigate, useParams } from "react-router"
import { auth, privateRoomsRef, messagesRef } from "../../firebase/setup";
import Message from "../map-components/Message";

const Chatroom = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname.split('/'));
    }, [location]);

    const query = messagesRef.orderBy('creationDate');
    const [messages] = useCollectionData(query);

    const [message, setMessage] = useState('');

    const handleMessageInput = (value) => setMessage(value);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message && message.trim()) {
            messagesRef.add({
                content: message,
                uid: auth.currentUser.uid,
                creationDate: firebase.firestore.FieldValue.serverTimestamp(),
                roomId: params.id
            }).then(() => {
                setMessage('');
    
                if (location.pathname.split('/')[1] === 'room') {
                    privateRoomsRef.doc(params.id).update({
                        dateOfLastMessageSent: firebase.firestore.FieldValue.serverTimestamp()
                    })
                }
            });
        }
    }

    return(
        <>
            <button className="btn" onClick={() => navigate('/')}>Go back</button>
            <main className="messages-space">
                {messages && messages.filter(msg => msg.roomId === params.id).map((msg, index) => <Message key={index} message={msg}/>)}
            </main>

            <form onSubmit={(e) => sendMessage(e)}>
              <input className="message-input" value={message} onChange={(e) => handleMessageInput(e.currentTarget.value)}/>
              <button className="btn" type="submit">Send</button>
            </form>
        </>
    )
}

export default Chatroom;