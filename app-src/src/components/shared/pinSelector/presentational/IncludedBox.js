import React from 'react';

import SelectorPinItem from './SelectorPinItem';

const IncludedBox = ({
    handlePinClick,
    includedPins,
    selectedPinOptions,
    handleMouseDown,
    handleMouseUp,
    handleMouseOut,
    clicking
}) => (
    <div className="content included size-lg-12" onMouseLeave={handleMouseOut}>
        {includedPins.map(pin => (
            <SelectorPinItem
                key={pin.value}
                pin={pin}
                handlePinClick={handlePinClick}
                active={selectedPinOptions.includes(pin.value)}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                clicking={clicking}
            />
        ))}
    </div>
);

export default IncludedBox;
