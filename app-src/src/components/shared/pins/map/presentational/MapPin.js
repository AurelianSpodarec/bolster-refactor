import React from 'react';
import { withRouter } from 'react-router-dom';

import L from 'leaflet';
import Control from 'react-leaflet-control';
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
    handleOpenPin,
    handleCancelPin,
    pinImages = [],
    isExcluding,
    updateIsPinExcluded,
    excludedPinIDs,
    showPinInfo,
    tooltipVisible
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
        <>
            <Marker
                key={id}
                position={[latY, lngX]}
                icon={divIcon}
                onClick={onClick}
                opacity={isExcluded ? 0.3 : 1}
                onMouseOver={() => handleOpenPin(id)}
                onMouseOut={() => handleCancelPin()}
            />

            {withTooltip && tooltipVisible && (
                <Control className={'pin-tooltip'} position="topright">
                    <div className="holder">
                        <strong>Pin code</strong>: {`${pinCode}`} <br />
                        <strong>Status</strong>: {`${PIN_STATUS_TYPES[status]}`}{' '}
                        <br />
                        <strong>Created</strong>:{' '}
                        <DateTimeContainer date={createdOn} /> <br />
                        {updated && (
                            <>
                                <strong>Updated</strong>:{' '}
                                <DateTimeContainer date={updated} /> <br />
                            </>
                        )}
                        {user && (
                            <>
                                <strong>Created by</strong>:{' '}
                                {user.userFirstName} {user.userLastName} <br />
                            </>
                        )}
                        {service && (
                            <>
                                <strong>Latest Service</strong>: {service.name}{' '}
                                <br />{' '}
                            </>
                        )}
                        {!!pinImages.length && (
                            <>
                                <strong>Latest History Images</strong>: <br />
                                {pinImages.length >= 2 ? (
                                    <div className="photo-slider">
                                        <MapPinPhotoSlider
                                            pinImages={pinImages}
                                        />
                                    </div>
                                ) : (
                                    <img
                                        key={pinImages[0]}
                                        alt=""
                                        src={`${RAW_S3_STORAGE_URL}/${
                                            pinImages[0]
                                        }`}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </Control>
            )}
        </>
    );
};

export default withRouter(DrawingMapPin);
