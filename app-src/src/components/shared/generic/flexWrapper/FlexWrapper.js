import React from 'react';

const FlexWrapper = ({
    children,
    direction = 'row', // row, row-reverse, column, column-reverse
    wrap = 'nowrap', // wrap, nowrap
    justify = 'start', // start, end, center, around, between, evenly
    align = 'stretch', // start, end, center, stretch, baseline
    gap = 0,
    width = 12, // number ranging from 1 to 12
    autoWidth = false,
    extraClasses = '',
}) => {
    const flexDirection = `flex-${direction}`;
    const flexWrap = `flex-${wrap}`;
    const flexJustify = `justify-${justify}`;
    const flexAlign = `align-${align}`;
    const blockWidth = autoWidth ? '' : `width-${width}`;

    return (
        <div
            className={`${flexDirection} ${flexWrap} ${flexJustify} ${flexAlign} ${blockWidth} ${extraClasses}`}
            style={{ gap }}
        >
            {children}
        </div>
    );
};

export default FlexWrapper;
