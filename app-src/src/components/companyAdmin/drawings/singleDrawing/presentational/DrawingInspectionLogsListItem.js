import React from 'react';
import { Link } from 'react-router-dom';

const DrawingInspectionLogsListItem = ({ inspectionLog }) => {
    const pinColours = {
        'action required': 'red',
        installed: 'green',
        inspected: 'blue',
        'no action': 'yellow'
    };

    const { status = '' } = inspectionLog;
    const pinColour = pinColours[status.toLowerCase()] || 'red';

    const pinIcon = require(`_content/images/pins/${pinColour}-pin.png`);

    return (
        <tr key={inspectionLog.id}>
            <td>
                <img className="pin" alt={`${pinColour} pin`} src={pinIcon} />{' '}
                {inspectionLog.name}
            </td>
            <td>{inspectionLog.status}</td>
            <td>
                <Link
                    to={`/company/pins/${inspectionLog.pinId}`}
                    className="button"
                >
                    View
                </Link>
            </td>
        </tr>
    );
};

export default DrawingInspectionLogsListItem;
