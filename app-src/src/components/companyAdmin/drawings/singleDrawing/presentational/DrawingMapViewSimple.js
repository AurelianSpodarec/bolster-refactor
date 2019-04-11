import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import MapPin from 'components/shared/pins/presentational/MapPin';

const DrawingMapViewSimple = ({ position, zoom, pins, handleClick }) => (
    <Map
        center={position}
        zoom={zoom}
        minZoom={0}
        maxZoom={6}
        onClick={handleClick}
    >
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://www.silverchip.com/tiles/{z}/{x}/{y}.jpg"
            noWrap={true}
        />
        {pins.map(pin => (
            <MapPin key={pin.id} pin={pin} />
        ))}
    </Map>
);

export default DrawingMapViewSimple;
