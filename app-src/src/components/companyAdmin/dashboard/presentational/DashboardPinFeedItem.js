import React from 'react';
import moment from 'moment';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { PIN_STATUS_IDS as STATUS } from 'constants/companyAdmin/enums';

const DashboardPinFeedItem = ({ pin }) => {
    let pinColour = require('_content/images/pins-examples/red-pin.svg');

    switch (pin.status) {
        case STATUS.INSTALLED:
            pinColour = require('_content/images/pins-examples/green-pin.svg');
            break;
        case STATUS.INSPECTED:
            pinColour = require('_content/images/pins-examples/blue-pin.svg');
            break;
        case STATUS.NO_ACTION:
            pinColour = require('_content/images/pins-examples/yellow-pin.svg');
            break;
        case STATUS.ACTION_REQUIRED:
            pinColour = require('_content/images/pins-examples/red-pin.svg');
            break;
        case STATUS.OTHER:
            pinColour = require('_content/images/pins-examples/purple-pin.svg');
            break;
    }

    return (
        <tr key={pin.createdOn}>
            <td>
                <img
                    alt="pin icon"
                    src={pinColour}
                    style={{
                        float: 'left',
                        width: '18px',
                        marginRight: '10px',
                        marginTop: '-3px'
                    }}
                />{' '}
                {pin.pinCode}
            </td>
            <td>{pin.location}</td>
            <td>{moment(pin.createdOn).format('DD-MM-YYYY HH:mm')}</td>
            <td>{moment(pin.syncedOn).format('DD-MM-YYYY HH:mm')}</td>
            <td>
                <ButtonContainer to={`/company/pins/${pin.id}`}>
                    View
                </ButtonContainer>
            </td>
        </tr>
    );
};

export default DashboardPinFeedItem;
