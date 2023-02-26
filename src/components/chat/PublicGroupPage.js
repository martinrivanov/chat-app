import { groupsRef } from "../../firebase/setup";
import { useCollection } from 'react-firebase-hooks/firestore';
import Group from "../map-components/Group";
import { useState } from "react";
import { useNavigate } from "react-router";

const PublicGroupPage = (props) => {
    const {refference} = props;

    const [groups, loading] = useCollection(groupsRef);

    const [groupName, setGroupName] = useState('');

    const navigate = useNavigate();

    const handleGroupNameInput = (value) => setGroupName(value);

    const addNewGroup = () => {
        groupsRef.add({
            name: groupName,
        }).then((groupDoc) => {
            navigate(`/room/${groupDoc.id}`);
        });
    }

    return (
        <main ref={refference}>
            {!loading &&
                <div>
                    <h3>Groups</h3>
                    <p className="caution">Click on one of the groups to start chatting</p>
                    
                    <div className="group-list">
                        <ul>
                            {groups && groups.docs.map((docs, index) => <Group key={index} groupDocs={docs} />)}
                            <li className="group-card hover-form">
                                <div className="group-form">
                                    <input className="add-new-group" placeholder="Name of the group" value={groupName} onChange={(e) => handleGroupNameInput(e.currentTarget.value)} />
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