import React from 'react';
import moment from 'moment';
import { Map, Marker, TileLayer } from 'react-leaflet';

import MapPin from 'components/shared/pins/map/presentational/MapPin';
import { FILE_STORAGE_URL } from 'config';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SinglePinMap = ({
    pin,
    zoom,
    handleClick,
    user,
    drawing = {},
    moveMode,
    toggleMoveMode,
    editPinLocationPosition,
    handleeditPinLocation
}) => {
    return (
        <>
            {moveMode ? (
                <BlockHeading>
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
                <BlockHeading>
                    <button
                        className="button pull-right"
                        onClick={toggleMoveMode}
                    >
                        <i className="fa fa-plus" /> Move Pin
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
                <MapPin key={pin.id} pin={pin} />

                {moveMode && <Marker position={editPinLocationPosition} />}
            </Map>
            <p className="map-details">
                Last updated by:{' '}
                {`${user.userFirstName} ${user.userLastName} ${moment(
                    pin.latestCreatedOn
                ).format('DD/MM/YYYY HH:mm')}`}
            </p>
        </>
    );
};

export default SinglePinMap;
