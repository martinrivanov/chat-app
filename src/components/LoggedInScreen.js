import { auth } from "../firebase/setup";
import { getAuth } from "@firebase/auth";
import SignOut from "./SignOut";
import { useEffect } from "react";

const LoggedInScreen = (props) => {
    const {user} = props;

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <div>
            <img src={user.photoURL} />
            <h1>Welcome {user.displayName}</h1>
            <SignOut />
        </div>
    );
}

export default LoggedInScreen;