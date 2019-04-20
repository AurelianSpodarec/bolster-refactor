import React from 'react';

import SelectorPinItem from './SelectorPinItem';

const ExcludedBox = ({ handlePinClick, excludedPins }) =>
    excludedPins.map(pin => (
        <SelectorPinItem
            key={pin.value}
            pin={pin}
            handlePinClick={handlePinClick}
        />
    ));

export default ExcludedBox;
