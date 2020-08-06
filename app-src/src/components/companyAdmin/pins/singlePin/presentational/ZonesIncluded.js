import React from 'react';
import { isEmpty } from 'helpers/generic';

const ZonesIncluded = ({ zones }) => {
    if (isEmpty(zones)) return null;

    return <p className="map-details">Included in zones: {zones.join(', ')}</p>;
};

export default ZonesIncluded;
