import React from 'react';

import { PIN_STATUS_IDS as STATUS } from 'constants/companyAdmin/enums';
import { pin2xImgs } from '_content/images/map-markers';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

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
                <ButtonWrapper alignment="right">
                    <LinkButton
                        href={`/company/pins/${pin.pinID}`}
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

export default DashboardPinFeedItem;
