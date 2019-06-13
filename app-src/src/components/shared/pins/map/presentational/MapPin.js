import React from 'react';
import { withRouter } from 'react-router-dom';

import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import {
    PIN_STATUS_COLOURS as COLOURS,
    PIN_STATUS_TYPES
} from 'constants/companyAdmin/enums';
import CustomPin from './CustomPin';
import ReactDOMServer from 'react-dom/server';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatDate } from 'helpers/generic';
// import PinDetailsContainer from 'components/companyAdmin/pins/singlePin/containers/PinDetailsContainer';
// import Loading from 'components/shared/generic/misc/presentational/Loading';
import { RAW_S3_STORAGE_URL } from 'config';

const DrawingMapPin = ({
    pin: {
        id,
        location = {},
        pinCode,
        latestStatus = '',
        createdOn,
        latestCreatedOn
    },
    pinHistory = {},
    history,
    withLink,
    user,
    service,
    withTooltip,
    urlStart,
    handleFetchPin,
    handleCancelFetchPin,
    pinImages = []
}) => {
    const { latY = 1, lngX = 1 } = location;
    const status = pinHistory.status || latestStatus;
    const pinColour = COLOURS[status] || 'red';
    const updated =
        formatDate(latestCreatedOn) !== formatDate(createdOn)
            ? latestCreatedOn
            : null;
    const divIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(
            <CustomPin
                pinColour={pinColour}
                pinCode={pinCode}
                pinID={id}
                history={pinHistory}
            />
        ),
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        popupAnchor: [0, -50]
    });

    return (
        <Marker
            key={id}
            position={[latY, lngX]}
            icon={divIcon}
            onClick={() => withLink && history.push(`/${urlStart}/pins/` + id)}
        >
            {withTooltip && (
                <Tooltip
                    onOpen={() => handleFetchPin(id)}
                    onClose={handleCancelFetchPin}
                    sticky={true}
                >
                    <div>
                        {`Pin code: ${pinCode}`} <br />
                        {`Status: ${PIN_STATUS_TYPES[status]}`} <br />
                        Created: <DateTimeContainer date={createdOn} /> <br />
                        {updated && (
                            <>
                                Updated: <DateTimeContainer date={updated} />{' '}
                                <br />
                            </>
                        )}
                        {user && (
                            <>
                                Created by: {user.userFirstName}{' '}
                                {user.userLastName} <br />
                            </>
                        )}
                        {service && (
                            <>
                                Latest Service: {service.name} <br />{' '}
                            </>
                        )}
                        {!!pinImages.length && (
                            <>
                                Latest History Images: <br />
                                <div className="flex-tooltip-images">
                                    {pinImages.map(src => (
                                        <img
                                            className="tooltip-item"
                                            key={src}
                                            alt=""
                                            src={`${RAW_S3_STORAGE_URL}/${src}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </Tooltip>
            )}
        </Marker>
    );
};

export default withRouter(DrawingMapPin);
