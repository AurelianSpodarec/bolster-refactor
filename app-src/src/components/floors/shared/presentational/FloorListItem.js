import React from 'react';
import { Link } from 'react-router-dom';

const FloorListItem = ({ floor }) => (
    <tr>
        <td>{floor.name}</td>
        <td>{floor.permissions}</td>
        <td>
            <Link className="button light-blue" to={`/floors/${floor.id}`}>
                View
            </Link>
        </td>
    </tr>
);

export default FloorListItem;
