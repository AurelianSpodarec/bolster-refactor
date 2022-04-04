import React from 'react';

import useMenuActionsOverflow from './hooks/useActionMenuOverflow';

const ActionMenuContent = ({ children }) => {
    const { ref, isOverflowing, isOverflowChecked } = useMenuActionsOverflow();

    const displayClass = isOverflowChecked ? 'flex-column' : 'display-none';
    const overflowClass = isOverflowing ? 'bottom' : '';

    return (
        <div ref={ref} className={`action-menu ${displayClass} ${overflowClass}`}>
            {children}
        </div>
    );
};

export default ActionMenuContent;
