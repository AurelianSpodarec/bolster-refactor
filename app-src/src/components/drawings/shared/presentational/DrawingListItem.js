import React from 'react';
import { Link } from 'react-router-dom';

const DrawingListItem = ({ drawing }) => (
    <tr>
        <td>{drawing.name}</td>
        <td>##last updated##</td>
        <td>##expires##</td>
        <td>##permissions##</td>
        <td>
            <Link className="button light-blue" to={`/drawings/${drawing.id}`}>
                View
            </Link>
        </td>
    </tr>
);

export default DrawingListItem;
