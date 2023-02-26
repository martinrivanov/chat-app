import SignOut from "./auth/SignOut";
import { useEffect, useRef } from "react";
import PrivateChatRoomPage from "./chat/PrivateChatRoomPage";
import PublicGroupPage from "./chat/PublicGroupPage";

const AuthenticatedApp = (props) => {
    const {currentUser} = props;

    const privateChatRoomPage = useRef();
    const publicGroupPage = useRef();

    useEffect(() => {
        showPrivateChatRoomPage();
    }, [privateChatRoomPage]);

    const showPrivateChatRoomPage = () => {
        publicGroupPage.current.style.display = 'none';
        if (privateChatRoomPage.current) {
            privateChatRoomPage.current.style.display = 'block';
        }
    }

    const showPublicGroupPage = () => {
        publicGroupPage.current.style.display = 'block';
        privateChatRoomPage.current.style.display = 'none';
    }

    return (
        <div>
            <div>
                <SignOut />
            </div>

            <div>
                <button onClick={() => showPrivateChatRoomPage()}>Private Chat Rooms</button>
                <button onClick={() => showPublicGroupPage()}>Public Groups</button>
            </div>

            <PrivateChatRoomPage refference={privateChatRoomPage} currentUser={currentUser} />

            <PublicGroupPage refference={publicGroupPage}/>

        </div>
    );
}

export default AuthenticatedApp;