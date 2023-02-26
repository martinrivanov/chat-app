import firebase from "firebase/compat/app";
import { useState } from "react";
import { useNavigate } from "react-router";
import { firestore, privateRoomsRef, usersRef, messagesRef } from "../../firebase/setup";

const ChatroomCreateDialog = (props) => {
    const {currentUserId, secondUserId, setUserId, reference} = props;

    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleMessageInput = (value) => setMessage(value);

    const handleDialogSubmit = async (e) => {
        e.preventDefault();

        const lastMessageTimestamp = firebase.firestore.FieldValue.serverTimestamp();

        const docRef = await privateRoomsRef.add({
            uidFirstUser: currentUserId,
            uidSecondUser: secondUserId,
            dateOfLastMessageSent: lastMessageTimestamp
        });

        messagesRef.add({
            content: message,
            uid: currentUserId,
            creationDate: lastMessageTimestamp,
            roomId: docRef.id
        }).then(() => {
            usersRef.doc(currentUserId).update({
                interactedUsers: firebase.firestore.FieldValue.arrayUnion(secondUserId)
            })
        }).then(() => {
            usersRef.doc(secondUserId).update({
                interactedUsers: firebase.firestore.FieldValue.arrayUnion(currentUserId)
            })
        }).then(() => {
            navigate(`/room/${docRef.id}`)
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