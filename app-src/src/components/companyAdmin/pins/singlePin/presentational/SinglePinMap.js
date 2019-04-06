import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import DrawingMapPin from 'components/companyAdmin/drawings/singleDrawing/presentational/DrawingMapPin';

const SinglePinMap = ({ pin, zoom, position, handleClick }) => (
    <Map center={position} zoom={zoom} onClick={handleClick}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://www.silverchip.com/tiles/{z}/{x}/{y}.jpg"
            noWrap={true}
        />
        <DrawingMapPin key={pin.id} pin={pin} />
    </Map>
);

export default SinglePinMap;
