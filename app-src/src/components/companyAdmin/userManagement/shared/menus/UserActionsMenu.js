import React from 'react';
import useMenuActionsOverflow from '../hooks/useUserActionsMenuOverflow';

const UserActionsMenu = ({ children }) => {
    const { ref, isOverflowing } = useMenuActionsOverflow();

    return (
        <div ref={ref} className={`user-actions-wrapper ${isOverflowing ? 'bottom' : ''}`}>
            {children}
        </div>
    );
};

export default UserActionsMenu;
