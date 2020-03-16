import React from 'react';

const ZoneSelectItem = ({
    option: {
        value,
        text
        // colorHex - could use this in output?
    },
    active,
    onClick
}) => {
    return (
        <div
            className={`selector-pin ${active ? 'active' : ''}`}
            onClick={_handleClick}
        >
            {text}
        </div>
    );

    function _handleClick(e) {
        e.preventDefault();
        onClick(value);
    }
};

export default ZoneSelectItem;
