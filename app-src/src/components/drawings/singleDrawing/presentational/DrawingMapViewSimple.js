import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const DrawingMapViewSimple = ({ position, zoom, pins }) => (
    <Map center={position} zoom={zoom}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map(pin => (
            <Marker
                key={pin.id}
                position={[Number(pin.latitude), Number(pin.longitude)]}
            >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        ))}
    </Map>
);

export default DrawingMapViewSimple;
