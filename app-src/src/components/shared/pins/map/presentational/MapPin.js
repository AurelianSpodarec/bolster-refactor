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
import MapPinPhotoSlider from './MapPinPhotoSlider';

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
    pinImages = [],
    isExcluding,
    updateIsPinExcluded,
    excludedPinIDs
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
    const isExcluded = isExcluding ? excludedPinIDs.includes(id) : false;
    const onClick = !isExcluding
        ? () => {
              withLink && history.push(`/${urlStart}/pins/` + id);
          }
        : () => {
              updateIsPinExcluded(id, !isExcluded);
          };

    return (
        <Marker
            key={id}
            position={[latY, lngX]}
            icon={divIcon}
            onClick={onClick}
            opacity={isExcluded ? 0.3 : 1}
        >
            {withTooltip && (
                <Tooltip
                    onOpen={() => handleFetchPin(id)}
                    onClose={handleCancelFetchPin}
                    sticky={false}
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
                                {pinImages.length >= 2 ? (
                                    <div style={{ width: '300px' }}>
                                        <MapPinPhotoSlider
                                            pinImages={pinImages}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ width: '300px' }}>
                                        <img
                                            style={{ width: '300px' }}
                                            key={pinImages[0]}
                                            alt=""
                                            src={`${RAW_S3_STORAGE_URL}/${
                                                pinImages[0]
                                            }`}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Tooltip>
            )}
        </Marker>
    );
};

export default withRouter(DrawingMapPin);
