import React from 'react';

const Tooltip = ({
    children,
    side = 'right',
    text,
    show,
    handleMouseOver,
    handleMouseOut
}) => (
    <>
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {children}
        </div>
        {show && (
            <div className={`tooltip ${side}`}>
                <div className="tooltip-arrow" />
                <div className="tooltip-inner">{text}</div>
            </div>
        )}
    </>
);

export default Tooltip;
