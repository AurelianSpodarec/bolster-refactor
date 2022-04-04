import React from 'react';

import useMenuActionsOverflow from './hooks/useActionMenuOverflow';

const ActionMenuContent = ({ children }) => {
    const { ref, isOverflowing } = useMenuActionsOverflow();

    return (
        <div ref={ref} className={`action-menu flex-column ${isOverflowing ? 'bottom' : ''}`}>
            {children}
        </div>
    );
};

export default ActionMenuContent;
