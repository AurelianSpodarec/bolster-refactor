import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import DrawingMapPin from './DrawingMapPin';

const DrawingMapViewSimple = ({ position, zoom, pins }) => (
    <Map center={position} zoom={zoom}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map(pin => (
            <DrawingMapPin key={pin.id} pin={pin} />
        ))}
    </Map>
);

export default DrawingMapViewSimple;
