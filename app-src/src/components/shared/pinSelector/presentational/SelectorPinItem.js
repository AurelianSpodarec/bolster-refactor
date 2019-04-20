import React from 'react';

const SelectorPinItem = ({ pin, handlePinClick }) => (
    <div onClick={e => handlePinClick(e, pin.value)} className="selector-pin">
        {pin.text}
    </div>
);

export default SelectorPinItem;
