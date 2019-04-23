import React from 'react';

import SelectorPinItemContainer from '../container/SelectorPinItemContainer';

const ExcludedBox = ({ handlePinClick, excludedPins }) => (
    <div className="selector-box excluded size-lg-12">
        {excludedPins.map(pin => (
            <SelectorPinItemContainer
                key={pin.value}
                pin={pin}
                handlePinClick={handlePinClick}
            />
        ))}
    </div>
);

export default ExcludedBox;
