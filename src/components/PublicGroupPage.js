import { firestore } from "../firebase/setup";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect } from "react";
import Group from "./Group";

const PublicGroupPage = (props) => {
    const {refference} = props;

    const groupsRef = firestore.collection('groups');
    const [groups, loading] = useCollection(groupsRef);

    return (
        <main ref={refference}>
            {!loading &&
                <div>
                    <h3>Groups...</h3>
                    <p>Click on one of the groups to start chatting</p>
                    <ul>
                        {groups && groups.docs.map((docs, index) => <Group key={index} groupDocs={docs} />)}
                    </ul>
                </div>
            }
        </main>
    );
}

export default PublicGroupPage;