import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import MapPin from 'components/shared/pins/map/presentational/MapPin';
import { FILE_STORAGE_URL } from 'config';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const SinglePinMap = ({
    pin,
    zoom,
    handleClick,
    user,
    drawing = {},
    moveMode,
    toggleMoveMode,
    editPinLocationPosition,
    handleeditPinLocation,
    pinHistory,
    historyVersion,
    historyCount
}) => {
    return (
        <>
            {moveMode ? (
                <BlockHeading title={`Pin ${pin.pinCode}`}>
                    <h4 className="small-text">
                        (History {historyVersion} of {historyCount})
                    </h4>
                    <button
                        onClick={handleeditPinLocation}
                        className="button green pull-right"
                    >
                        <i className="fa fa-check" /> Confirm position
                    </button>
                    <button
                        className="button red pull-right"
                        onClick={toggleMoveMode}
                    >
                        Stop
                    </button>
                </BlockHeading>
            ) : (
                <BlockHeading title={`Pin ${pin.pinCode}`}>
                    <h4 className="small-text">
                        (History {historyVersion} of {historyCount})
                    </h4>
                    <button
                        className="button pull-right"
                        onClick={toggleMoveMode}
                    >
                        <i className="fa fa-arrows-alt" />
                        Move Pin
                    </button>
                </BlockHeading>
            )}

            <Map
                center={[pin.location.latY, pin.location.lngX]}
                zoom={zoom}
                onClick={handleClick}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                    url={`${FILE_STORAGE_URL}/${
                        drawing.tilesetS3Key
                    }/{z}/{x}/{y}.jpg`}
                    noWrap={true}
                />
                <MapPin key={pin.id} pin={pin} pinHistory={pinHistory} />

                {moveMode && <Marker position={editPinLocationPosition} />}
            </Map>
            <p className="map-details">
                Last updated by: {`${user.userFirstName} ${user.userLastName} `}
                <DateTimeContainer date={pin.latestCreatedOn} />
            </p>
        </>
    );
};

export default SinglePinMap;
