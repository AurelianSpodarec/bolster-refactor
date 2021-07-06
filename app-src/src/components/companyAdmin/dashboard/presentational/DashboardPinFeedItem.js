import React from 'react';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { PIN_STATUS_IDS as STATUS } from 'constants/companyAdmin/enums';
import { pin2xImgs } from '_content/images/map-markers';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DashboardPinFeedItem = ({ pin }) => {
    let pinColour;

    switch (pin.status) {
        case STATUS.INSTALLED:
            pinColour = pin2xImgs.green;
            break;
        case STATUS.INSPECTED:
            pinColour = pin2xImgs.blue;
            break;
        case STATUS.NO_ACTION:
            pinColour = pin2xImgs.yellow;
            break;
        case STATUS.ACTION_REQUIRED:
            pinColour = pin2xImgs.red;
            break;
        case STATUS.OTHER:
            pinColour = pin2xImgs.purple;
            break;
        default:
            pinColour = pin2xImgs.red;
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
                        top: '6px',
                        height: '30px',
                    }}
                />
                <span style={{ float: 'left', width: '100%' }}>{pin.pinCode}</span>
            </td>
            <td>{pin.location}</td>
            <td>
                <DateTimeContainer date={pin.createdOn} format="DD-MM-YYYY HH:mm" />
            </td>
            <td>
                <DateTimeContainer date={pin.syncedOn} format="DD-MM-YYYY HH:mm" />
            </td>
            <td>
                <ButtonContainer to={`/company/pins/${pin.pinID}`}>View</ButtonContainer>
            </td>
        </tr>
    );
};

export default DashboardPinFeedItem;
