import React from 'react';
import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DrawingListItem = ({ drawing, permissions }) => (
    <tr>
        <td>{drawing.name}</td>
        <td>
            <DateTimeContainer date={drawing.pinsLastUpdatedOn} />
        </td>
        <td>
            <DateTimeContainer date={drawing.expiresOn} />
        </td>
        <td>{permissions}</td>
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
