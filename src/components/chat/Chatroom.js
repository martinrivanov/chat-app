import firebase from "firebase/compat/app";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router"
import { auth, firestore } from "../../firebase/setup";
import Message from "../map-components/Message";

const Chatroom = () => {
    const navigate = useNavigate();
    const params = useParams();

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('creationDate');
    const [messages] = useCollectionData(query);

    const [message, setMessage] = useState('');

    const handleMessageInput = (value) => setMessage(value);

    const sendMessage = (e) => {
        e.preventDefault();

        messagesRef.add({
            content: message,
            uid: auth.currentUser.uid,
            creationDate: firebase.firestore.FieldValue.serverTimestamp(),
            roomId: params.id
        }).then(() => {
            setMessage('');
        });
    }

    return(
        <>
            <button onClick={() => navigate('/')}>Go back</button>
            <main>
                {messages && messages.filter(msg => msg.roomId === params.id).map((msg, index) => <Message key={index} message={msg}/>)}
            </main>

            <form onSubmit={(e) => sendMessage(e)}>
              <input value={message} onChange={(e) => handleMessageInput(e.currentTarget.value)}/>
              <button type="submit">Send</button>
            </form>
        </>
    )
}

export default Chatroom;