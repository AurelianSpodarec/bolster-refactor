import React from 'react';
import MapPinSelectorBoxItem from './MapPinSelectorBoxItem';

const MapPinSelectorBox = ({ pins }) => (
    <div className="content size-lg-12">
        {pins.map(pin => (
            <MapPinSelectorBoxItem pin={pin} key={pin.id} />
        ))}
    </div>
);

export default MapPinSelectorBox;
