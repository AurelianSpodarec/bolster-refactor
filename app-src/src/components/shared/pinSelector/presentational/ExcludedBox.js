import React from 'react';

import SelectorPinItem from './SelectorPinItem';

const ExcludedBox = ({
    handlePinClick,
    excludedPins,
    selectedPinOptions,
    handleMouseDown,
    handleMouseUp,
    handleMouseOut,
    clicking
}) => (
    <div
        className="selector-box excluded size-lg-12"
        onMouseLeave={handleMouseOut}
    >
        {excludedPins.map(pin => (
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

export default ExcludedBox;
