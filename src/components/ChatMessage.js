import { useEffect } from "react";
import { auth } from "../firebase/setup";

const ChatMessage = (props) => {
    const {content, uid} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <p>{content}</p>
        </div>
    );
}

export default ChatMessage;