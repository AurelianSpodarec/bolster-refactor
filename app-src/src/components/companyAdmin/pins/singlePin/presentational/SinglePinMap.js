import React from 'react';
import moment from 'moment';
import { Map, TileLayer } from 'react-leaflet';

import MapPin from 'components/shared/pins/presentational/MapPin';

const SinglePinMap = ({ pin, zoom, handleClick, user }) => (
    <>
        <Map
            center={[pin.location.latY, pin.location.lngX]}
            zoom={zoom}
            onClick={handleClick}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://www.silverchip.com/tiles/{z}/{x}/{y}.jpg"
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
