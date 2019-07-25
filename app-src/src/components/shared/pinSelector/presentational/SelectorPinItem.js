import React from 'react';

const SelectorPinItem = ({
    pin,
    handlePinClick,
    active,
    handleMouseDown,
    handleMouseUp,
    clicking,
    pinsList
}) => (
    <div
        // onClick={e => handlePinClick(e, pin.value)}
        className={`selector-pin ${active ? 'active' : ''}`}
        onMouseDown={e => {
            handlePinClick(e, pin.value, pinsList);
            handleMouseDown();
        }}
        onMouseUp={handleMouseUp}
        onMouseOver={clicking ? e => handlePinClick(e, pin.value) : null}
    >
        {pin.text}
    </div>
);

export default SelectorPinItem;
