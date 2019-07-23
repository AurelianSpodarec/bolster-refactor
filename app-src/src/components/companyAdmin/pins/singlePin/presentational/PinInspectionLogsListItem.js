import React from 'react';
import {
    PIN_STATUS_COLOURS as COLOURS,
    PIN_STATUS_TYPES as TYPES
} from 'constants/companyAdmin/enums';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const PinInspectionLogsListItem = ({ pin, onMobile, headers }) => {
    const pinColour = COLOURS[pin.latestStatus] || 'red';

    const pinIcon = require(`_content/images/map-markers/${pinColour}-pin2x.png`);

    return (
        <tr key={pin.id}>
            <td>
                {onMobile && (
                    <span className="mobile-table-heading">{headers[0]}</span>
                )}
                <img className="pin" alt={`${pinColour} pin`} src={pinIcon} />{' '}
                {pin.pinCode}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[1]}</span>
                )}
                {TYPES[pin.latestStatus]}
            </td>
            <td>
                {onMobile && (
                    <span className="mobile-table-heading">{headers[2]}</span>
                )}
                <ButtonContainer to={`/company/pins/${pin.id}`}>
                    View
                </ButtonContainer>
            </td>
        </tr>
    );
};

export default PinInspectionLogsListItem;
