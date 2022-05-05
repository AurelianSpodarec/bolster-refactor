import React from 'react';
import {
    PIN_STATUS_COLOURS as COLOURS,
    PIN_STATUS_TYPES as TYPES,
} from 'constants/companyAdmin/enums';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { pin2xImgs } from '_content/images/map-markers';

const DrawingInspectionLogsListItem = ({ pin }) => {
    const pinColour = COLOURS[pin.latestStatus] || 'red';

    return (
        <tr key={pin.id}>
            <td>
                <img className="pin" alt={`${pinColour} pin`} src={pin2xImgs[pinColour]} />{' '}
                {pin.pinCode}
            </td>
            <td>{TYPES[pin.latestStatus]}</td>
            <td>
                <ButtonContainer to={`/client/pins/${pin.id}`}>View</ButtonContainer>
            </td>
        </tr>
    );
};

export default DrawingInspectionLogsListItem;
