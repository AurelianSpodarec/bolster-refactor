import React from 'react';
import moment from 'moment';

const DrawingDataByOperativeListItem = ({ operative }) => (
    <tr>
        <td>{operative.name}</td>
        <td>{moment(operative.lastLogin).format('DD-MM-YYYY HH:mm')}</td>
        <td>{moment(operative.lastSync).format('DD-MM-YYYY HH:mm')}</td>
        <td>{operative.pinsUpdated}</td>
        <td />
    </tr>
);

export default DrawingDataByOperativeListItem;
