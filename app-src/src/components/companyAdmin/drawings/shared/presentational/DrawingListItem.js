import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const DrawingListItem = ({ drawing }) => (
    <tr>
        <td>{drawing.name}</td>
        <td>
            {moment(drawing.pinsLastUpdatedOn).format('DD-MM-YYYY, h:mm a')}
        </td>
        <td>{moment(drawing.expiresOn).format('DD-MM-YYYY, h:mm a')}</td>
        <td>
            {drawing.permissions
                .map(permission => permission.companyName)
                .join(', ')}
        </td>
        <td>
            <Link
                className="button light-blue"
                to={`/company/drawings/${drawing.id}`}
            >
                View
            </Link>
        </td>
    </tr>
);

export default DrawingListItem;
