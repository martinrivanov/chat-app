import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Group = (props) => {
    const {groupDocs} = props;
    const data = groupDocs.data();

    return (
        <li>
            <h4>{data.name}</h4>
        </li>
    );
}

export default Group;