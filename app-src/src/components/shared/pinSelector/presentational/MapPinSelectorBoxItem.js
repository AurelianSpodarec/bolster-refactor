import React from 'react';

import PinSelectionText from './PinSelectionText';

const MapPinSelectorBoxItem = ({ pin }) => (
    <div className={'selector-pin active}'}>
        <PinSelectionText pinID={pin.id} pinCode={pin.pinCode} />
    </div>
);

export default MapPinSelectorBoxItem;
