import React from 'react';

import useMenuActionsOverflow from './hooks/useActionMenuOverflow';

const ActionMenuContent = ({ children }) => {
    const { ref, isOverflowing } = useMenuActionsOverflow();

    return (
        <div ref={ref} className={`action-menu ${isOverflowing ? 'bottom' : ''}`}>
            {children}
        </div>
    );
};

export default ActionMenuContent;
