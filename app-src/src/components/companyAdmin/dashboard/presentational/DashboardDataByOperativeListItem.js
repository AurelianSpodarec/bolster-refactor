import React from 'react';
import moment from 'moment';

const DrawingDataByOperativeListItem = ({ operative }) => (
    <tr>
        <td>{operative.name}</td>
        <td>
            {operative.lastLogin
                ? moment(operative.lastLogin).format('DD-MM-YYYY HH:mm')
                : 'Not logged in'}
        </td>
        <td>
            {operative.lastSync
                ? moment(operative.lastSync).format('DD-MM-YYYY HH:mm')
                : 'Not synced'}
        </td>
        <td>{operative.pinsUpdated}</td>
        <td />
    </tr>
);

export default DrawingDataByOperativeListItem;
