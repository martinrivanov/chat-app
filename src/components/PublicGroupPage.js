import { firestore } from "../firebase/setup";
import { useCollection } from 'react-firebase-hooks/firestore';
import Group from "./Group";
import { useState } from "react";

const PublicGroupPage = (props) => {
    const {refference} = props;

    const groupsRef = firestore.collection('groups');
    const [groups, loading] = useCollection(groupsRef);

    const [groupName, setGroupName] = useState('');

    const handleGroupNameInput = (value) => setGroupName(value);

    const addNewGroup = () => {
        //groupsRef.add()
    }

    return (
        <main ref={refference}>
            {!loading &&
                <div>
                    <h3>Groups</h3>
                    <p>Click on one of the groups to start chatting</p>
                    
                    <div className="group-list">
                        <ul>
                            {groups && groups.docs.map((docs, index) => <Group key={index} groupDocs={docs} />)}
                            <li className="group-card hover-form">
                                <p>Add new group</p>
                                <div className="group-form">
                                    <input placeholder="Name of the group" value={groupName} onChange={(e) => handleGroupNameInput(e.currentTarget.value)} />
                                    <button onClick={() => addNewGroup()}>Add new group</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </main>
    );
}

export default PublicGroupPage;