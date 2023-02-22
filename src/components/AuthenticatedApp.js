import SignOut from "./auth/SignOut";
import { useEffect, useRef } from "react";
import PrivateChatRoomPage from "./chat/PrivateChatRoomPage";
import PublicGroupPage from "./chat/PublicGroupPage";

const AuthenticatedApp = (props) => {
    const {currentUser} = props;

    const privateChatRoomPage = useRef();
    const publicGroupPage = useRef();

    const showPrivateChatRoomPage = () => {
        let action = privateChatRoomPage.current.classList.contains('hidden-page') ? privateChatRoomPage.current.classList.remove('hidden-page') : null;
        publicGroupPage.current.style.display = 'none';
    }

    const showPublicGroupPage = () => {
        publicGroupPage.current.style.display = 'block';
        privateChatRoomPage.current.classList.add('hidden-page');
    }

    useEffect(() => {
        showPrivateChatRoomPage();
    }, [privateChatRoomPage]);

    return (
        <div>
            <div>
                <img className="profile-img" src={currentUser.photoURL} alt="profile-img"/>
                <SignOut />
            </div>

            <div>
                <button onClick={() => showPrivateChatRoomPage()}>Private Chat Rooms</button>
                <button onClick={() => showPublicGroupPage()}>Public Groups</button>
            </div>

            <PrivateChatRoomPage refference={privateChatRoomPage} uid={currentUser.uid} />

            <PublicGroupPage refference={publicGroupPage}/>

        </div>
    );
}

export default AuthenticatedApp;