import React from 'react';
import {
    PIN_STATUS_COLOURS as COLOURS,
    PIN_STATUS_TYPES as TYPES
} from 'constants/companyAdmin/enums';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const DrawingInspectionLogsListItem = ({ pin }) => {
    const pinColour = COLOURS[pin.latestStatus] || 'red';

    const pinIcon = require(`_content/images/pins-examples/${pinColour}-pin.svg`);

    return (
        <tr key={pin.id}>
            <td>
                <img className="pin" alt={`${pinColour} pin`} src={pinIcon} />{' '}
                {pin.pinCode}
            </td>
            <td>{TYPES[pin.latestStatus]}</td>
            <td>
                <ButtonNoClickContainer to={`/company/pins/${pin.id}`}>
                    View
                </ButtonNoClickContainer>
            </td>
        </tr>
    );
};

export default DrawingInspectionLogsListItem;
