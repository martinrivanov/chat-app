import { auth, firestore } from "../firebase/setup";
import { getAuth } from "@firebase/auth";
import SignOut from "./SignOut";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect } from "react";
import User from "./User";

const LoggedInScreen = (props) => {
    const {currentUser} = props;

    const usersRef = firestore.collection('users');
    const query = usersRef.where('uid', '!=', currentUser.uid).orderBy('uid');
    const [users] = useCollectionData(query, {idField: 'id'});

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div>
            <SignOut />
            {users && users.map((u, index) => <User key={index} user={u} />)}
        </div>
    );
}

export default LoggedInScreen;