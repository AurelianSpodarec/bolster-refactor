import React from 'react';
import { Link } from 'react-router-dom';
import { PIN_STATUS_COLOURS as COLOURS } from 'constants/companyAdmin/enums';


const DrawingInspectionLogsListItem = ({ pin }) => {


    const pinColour = COLOURS[pin.latestStatus] || 'red';

    const pinIcon = require(`_content/images/pins-examples/${pinColour}-pin.svg`);

    return (
        <tr key={pin.id}>
            <td>

                {pin.pinCode}
            </td>
            <td>
                <img className="pin" alt={`${pinColour} pin`} src={pinIcon} />
            </td>
            <td>
                <Link
                    to={`/company/pins/${pin.id}`}
                    className="button"
                >
                    View
                </Link>
            </td>
        </tr>
    );
};

export default DrawingInspectionLogsListItem;
