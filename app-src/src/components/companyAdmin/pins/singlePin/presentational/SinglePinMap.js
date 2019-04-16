import React from 'react';
import moment from 'moment';
import { Map, TileLayer } from 'react-leaflet';

import MapPin from 'components/shared/pins/map/presentational/MapPin';
import { FILE_STORAGE_URL } from 'config';

const SinglePinMap = ({ pin, zoom, handleClick, user, drawing }) => (
    <>
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
        </Map>
        <p className="map-details">
            Last updated by:{' '}
            {`${user.userFirstName} ${user.userLastName} ${moment(
                pin.latestCreatedOn
            ).format('DD/MM/YYYY HH:mm')}`}
        </p>
    </>
);

export default SinglePinMap;
