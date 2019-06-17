import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import Block from 'components/shared/generic/block/presentational/Block';
import { FILE_STORAGE_URL } from 'config';
import MapPin from 'components/shared/pins/map/presentational/MapPin';

const FilterMap = ({ drawing, pins }) => (
    <Block>
        <Map center={[51.505, -0.09]} zoom={3} minZoom={0} maxZoom={5}>
            <TileLayer
                attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                url={`${FILE_STORAGE_URL}/${
                    drawing.tilesetS3Key
                }/{z}/{x}/{y}.jpg`}
                noWrap={true}
            />
            {pins.map(pin => (
                <MapPin key={pin.id} pin={pin} />
            ))}
        </Map>
    </Block>
);

export default FilterMap;
