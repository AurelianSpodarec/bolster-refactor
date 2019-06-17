import React from 'react';

const MapPinSelectorBoxItem = ({ pin }) => {
    return <div className={'selector-pin active}'}>{pin.pinCode}</div>;
};

export default MapPinSelectorBoxItem;
