import React from 'react';

const Tooltip = ({
    children,
    side = 'right',
    text,
    show,
    handleMouseOver,
    handleMouseOut,
    containerSide = 'right',
}) => (
    <div className={`tooltip-container ${containerSide}`}>
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {children}
        </div>
        {show && (
            <div className={`tooltip ${side}`}>
                <div className="tooltip-arrow" />
                <div className="tooltip-label">{text}</div>
            </div>
        )}
    </div>
);

export default Tooltip;
