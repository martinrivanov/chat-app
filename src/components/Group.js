import { Link } from 'react-router-dom';

const Group = (props) => {
    const {groupDocs} = props;
    const data = groupDocs.data();

    return (
        <li className="group">
            <Link to={`/room/${groupDocs.id}`}>{data.name}</Link>
        </li>
    );
}

export default Group;