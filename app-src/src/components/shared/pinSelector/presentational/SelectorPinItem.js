import React from 'react';

const SelectorPinItem = ({ pin, handlePinClick, active }) => (
    <div
        onClick={e => handlePinClick(e, pin.value)}
        className={`selector-pin ${active ? 'active' : ''}`}
    >
        {pin.text}
    </div>
);

export default SelectorPinItem;
