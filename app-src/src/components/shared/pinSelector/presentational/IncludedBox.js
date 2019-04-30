import React from 'react';

import SelectorPinItem from './SelectorPinItem';

const IncludedBox = ({ handlePinClick, includedPins, selectedPinOptions }) => (
    <div className="selector-box included size-lg-12">
        {includedPins.map(pin => (
            <SelectorPinItem
                key={pin.value}
                pin={pin}
                handlePinClick={handlePinClick}
                active={selectedPinOptions.includes(pin.value)}
            />
        ))}
    </div>
);

export default IncludedBox;
