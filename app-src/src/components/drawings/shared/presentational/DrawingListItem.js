import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const DrawingListItem = ({ drawing }) => (
    <tr>
        <td>{drawing.name}</td>
        <td>{drawing.permissions}</td>
        <td>{moment(drawing.lastUpdated).format('DD/MM/YYYY')}</td>
        <td>{moment(drawing.expires).format('DD/MM/YYYY')}</td>
        <td>
            <Link className="button light-blue" to={`/drawings/${drawing.id}`}>
                View
            </Link>
        </td>
    </tr>
);

export default DrawingListItem;
