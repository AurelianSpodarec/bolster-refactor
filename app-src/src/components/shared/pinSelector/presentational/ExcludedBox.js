import React from 'react';

import SelectorPinItem from './SelectorPinItem';

const ExcludedBox = ({ handlePinClick, excludedPins, selectedPinOptions }) => (
    <div className="selector-box excluded size-lg-12">
        {excludedPins.map(pin => (
            <SelectorPinItem
                key={pin.value}
                pin={pin}
                handlePinClick={handlePinClick}
                active={selectedPinOptions.includes(pin.value)}
            />
        ))}
    </div>
);

export default ExcludedBox;
