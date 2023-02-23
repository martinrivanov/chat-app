import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { firestore } from "../../firebase/setup";

const ChatroomCreateDialog = (props) => {
    const {currentUserId, secondUserId, privateRoomsRef, setUserId, reference} = props;

    useEffect(() => {
        console.log(props.currentUserId);
    }, [props]);

    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const messageRef = firestore.collection('messages');

    const handleMessageInput = (value) => setMessage(value);

    const handleDialogSubmit = (e) => {
        e.preventDefault();

        const lastMessageTimestamp = firebase.firestore.FieldValue.serverTimestamp();

        console.log(secondUserId);

        privateRoomsRef.add({
            uidFirstUser: currentUserId,
            uidSecondUser: secondUserId,
            dateOfLastMessageSent: lastMessageTimestamp
        }).then((docRef) => {
            messageRef.add({
                content: message,
                uid: currentUserId,
                creationDate: lastMessageTimestamp,
                roomId: docRef.id
            }).then(() => {
                console.log(docRef.id);
            })
        })
    }

    const hideDialog = () => {
        reference.current.style.display = "none";
        setMessage('');
        setUserId('');
    }

    return (
        <div className="modal" ref={reference}>
            <div className="modal-content">
                <span className="close-btn" onClick={() => hideDialog()}>&times;</span>
                <form onSubmit={(e) => handleDialogSubmit(e)}>
                    <input type="text" placeholder="Write your first message to this person..." value={message} onChange={(e) => handleMessageInput(e.currentTarget.value)} />
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default ChatroomCreateDialog;