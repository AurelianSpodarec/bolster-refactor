import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import DrawingMapPin from 'components/companyAdmin/drawings/singleDrawing/presentational/DrawingMapPin';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const SinglePinMap = ({
    pin,
    error,
    isFetching,
    zoom,
    mapCentre,
    handleClick
}) => (
    <BlockContainer isEmpty={!pin.id} isFetching={isFetching} error={error}>
        <Map center={mapCentre} zoom={zoom} onClick={handleClick}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DrawingMapPin key={pin.id} pin={pin} />
        </Map>
    </BlockContainer>
);

export default SinglePinMap;
