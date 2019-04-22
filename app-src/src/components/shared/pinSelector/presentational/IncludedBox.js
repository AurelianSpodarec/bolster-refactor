import React from 'react';

import SelectorPinItemContainer from '../container/SelectorPinItemContainer';

const IncludedBox = ({ handlePinClick, includedPins }) => (
    <div className="selector-box included size-lg-12">
        {includedPins.map(pin => (
            <SelectorPinItemContainer
                key={pin.value}
                pin={pin}
                handlePinClick={handlePinClick}
            />
        ))}
    </div>
);

export default IncludedBox;
