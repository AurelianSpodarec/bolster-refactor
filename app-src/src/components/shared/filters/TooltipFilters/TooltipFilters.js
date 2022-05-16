import React from 'react';

import useClickOutside from 'hooks/useClickOutside';

const TooltipFilters = ({ children, closeFilters }) => {
    const ref = useClickOutside(closeFilters);

    return (
        <div ref={ref} className="tooltip-filters border static-width full-option-height right">
            {children}
        </div>
    );
};

export default TooltipFilters;
