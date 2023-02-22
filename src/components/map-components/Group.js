import { Link } from 'react-router-dom';

const Group = (props) => {
    const {groupDocs} = props;
    const data = groupDocs.data();

    return (
        <li className="group-card">
            <Link to={`/group/${groupDocs.id}`}>{data.name}</Link>
        </li>
    );
}

export default Group;