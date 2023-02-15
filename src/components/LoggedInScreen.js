import { auth, firestore } from "../firebase/setup";
import { getAuth } from "@firebase/auth";
import SignOut from "./SignOut";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect } from "react";

const LoggedInScreen = (props) => {
    const {currentUser} = props;

    const usersRef = firestore.collection('users');
    const query = usersRef.where('uid', '!=', currentUser.uid).orderBy('uid');
    const [users] = useCollectionData(query, {idField: 'id'});

    useEffect(() => {
        console.log(users.sort(u => u.fullName));
    }, [users]);

    return (
        <div>
            <img src={currentUser.photoURL} />
            <h1>Welcome {currentUser.displayName}</h1>
            <SignOut />
        </div>
    );
}

export default LoggedInScreen;