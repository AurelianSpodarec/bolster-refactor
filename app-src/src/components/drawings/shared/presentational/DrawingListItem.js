import React from 'react';
import { Link } from 'react-router-dom';

const DrawingListItem = ({ drawing }) => (
    <tr>
        <td>{drawing.name}</td>
        <td>{drawing.permissions}</td>
        <td>
            <Link className="button light-blue" to={`/drawings/${drawing.id}`}>
                View
            </Link>
        </td>
    </tr>
);

export default DrawingListItem;
