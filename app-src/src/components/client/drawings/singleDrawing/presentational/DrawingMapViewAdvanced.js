import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { CRS } from 'leaflet';

//old - probably not going to use this componenet
const DrawingMapViewAdvanced = ({ position, zoom }) => (
    <Map center={position} zoom={zoom} crs={CRS.Simple} maxZoom={10}>
        <TileLayer
            maxZoom={10}
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </Map>
);

export default DrawingMapViewAdvanced;
