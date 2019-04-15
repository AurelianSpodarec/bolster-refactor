import React from 'react';
import { Link } from 'react-router-dom';
import { PIN_STATUS_COLOURS as COLOURS } from 'constants/companyAdmin/enums';


const DrawingInspectionLogsListItem = ({ inspectionLog }) => {


    const pinColour = COLOURS[inspectionLog.latestStatus] || 'red';

    const pinIcon = require(`_content/images/pins-examples/${pinColour}-pin.svg`);

    return (
        <tr key={inspectionLog.id}>
            <td>

                {inspectionLog.pinCode}
            </td>
            <td>
                <img className="pin" alt={`${pinColour} pin`} src={pinIcon} />
            </td>
            <td>
                <Link
                    to={`/company/pins/${inspectionLog.id}`}
                    className="button"
                >
                    View
                </Link>
            </td>
        </tr>
    );
};

export default DrawingInspectionLogsListItem;
