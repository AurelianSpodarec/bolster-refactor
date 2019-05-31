import React from 'react';
import {
    PIN_STATUS_COLOURS as COLOURS,
    PIN_STATUS_TYPES as TYPES
} from 'constants/companyAdmin/enums';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const DrawingInspectionLogsListItem = ({ pin }) => {
    const pinColour = COLOURS[pin.latestStatus] || 'red';

    const pinIcon = require(`_content/images/map-markers/${pinColour}-pin2x.png`);

    return (
        <tr key={pin.id}>
            <td>
                <img className="pin" alt={`${pinColour} pin`} src={pinIcon} />{' '}
                {pin.pinCode}
            </td>
            <td>{TYPES[pin.latestStatus]}</td>
            <td>
                <ButtonContainer to={`/client/pins/${pin.id}`}>
                    View
                </ButtonContainer>
            </td>
        </tr>
    );
};

export default DrawingInspectionLogsListItem;
