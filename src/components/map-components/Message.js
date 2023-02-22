import { auth } from "../../firebase/setup";

const Message = (props) => {
    const {content, uid} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <p>{content}</p>
        </div>
    );
}

export default Message;