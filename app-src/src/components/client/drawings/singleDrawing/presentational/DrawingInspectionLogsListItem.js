import React from 'react';
import {
    PIN_STATUS_COLOURS as COLOURS,
    PIN_STATUS_TYPES as TYPES,
} from 'constants/companyAdmin/enums';

import { pin2xImgs } from '_content/images/map-markers';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

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
                <ButtonWrapper alignment="right">
                    <LinkButton
                        href={`/client/pins/${pin.id}`}
                        text="View"
                        size="small"
                        source="secondary"
                        ambient="positive"
                    />
                </ButtonWrapper>
            </td>
        </tr>
    );
};

export default DrawingInspectionLogsListItem;
