import React from 'react';
import moment from 'moment';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { PIN_STATUS_IDS as STATUS } from 'constants/companyAdmin/enums';

const DashboardPinFeedItem = ({ pin }) => {
    let pinColour = require('_content/images/map-markers/red-pin2x.png');

    switch (pin.status) {
        case STATUS.INSTALLED:
            pinColour = require('_content/images/map-markers/green-pin2x.png');
            break;
        case STATUS.INSPECTED:
            pinColour = require('_content/images/map-markers/blue-pin2x.png');
            break;
        case STATUS.NO_ACTION:
            pinColour = require('_content/images/map-markers/yellow-pin2x.png');
            break;
        case STATUS.ACTION_REQUIRED:
            pinColour = require('_content/images/map-markers/red-pin2x.png');
            break;
        case STATUS.OTHER:
            pinColour = require('_content/images/map-markers/purple-pin2x.png');
            break;
        default:
            break;
    }

    return (
        <tr key={pin.createdOn}>
            <td style={{ paddingTop: '17px' }}>
                <img
                    alt="pin icon"
                    src={pinColour}
                    style={{
                        width: '18px',
                        marginLeft: '10px',
                        marginBottom: '5px',
                        marginTop: '-12px',
                        top: '6px'
                    }}
                />
                <span style={{ float: 'left', width: '100%' }}>
                    {pin.pinCode}
                </span>
            </td>
            <td>{pin.location}</td>
            <td>{moment(pin.createdOn).format('DD-MM-YYYY HH:mm')}</td>
            <td>{moment(pin.syncedOn).format('DD-MM-YYYY HH:mm')}</td>
            <td>
                <ButtonContainer to={`/company/pins/${pin.pinID}`}>
                    View
                </ButtonContainer>
            </td>
        </tr>
    );
};

export default DashboardPinFeedItem;
