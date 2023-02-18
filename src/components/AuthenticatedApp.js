import SignOut from "./SignOut";
import { useEffect, useRef } from "react";
import PrivateChatRoomPage from "./PrivateChatRoomPage";
import PublicGroupPage from "./PublicGroupPage";

const AuthenticatedApp = (props) => {
    const {currentUser} = props;

    const privateChatRoomPage = useRef();
    const publicGroupPage = useRef();

    const showPrivateChatRoomPage = () => {
        privateChatRoomPage.current.style.display = 'block';
        publicGroupPage.current.style.display = 'none';
    }

    const showPublicGroupPage = () => {
        publicGroupPage.current.style.display = 'block';
        privateChatRoomPage.current.style.display = 'none';
    }

    useEffect(() => {
        showPrivateChatRoomPage();
    }, [privateChatRoomPage]);

    return (
        <div>
            <div>
                <img className="profile-img" src={currentUser.photoURL}/>
                <SignOut />
            </div>

            <div>
                <button onClick={() => showPrivateChatRoomPage()}>Private Chat Rooms</button>
                <button onClick={() => showPublicGroupPage()}>Public Groups</button>
            </div>

            <PrivateChatRoomPage uid={currentUser.uid} refference={privateChatRoomPage} />

            <PublicGroupPage refference={publicGroupPage}/>

        </div>
    );
}

export default AuthenticatedApp;