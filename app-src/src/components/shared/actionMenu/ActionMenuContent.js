import React from 'react';

import useMenuActionsOverflow from './hooks/useActionMenuOverflow';

const actionMenuClassName = 'action-menu';

const ActionMenuContent = ({ children, closeMenu }) => {
    const { ref, isOverflowing, isOverflowChecked } = useMenuActionsOverflow();

    const displayClass = isOverflowChecked ? 'flex-column' : 'display-none';
    const overflowClass = isOverflowing ? 'bottom' : '';

    return (
        <div
            ref={ref}
            onClick={e => {
                const isButtonClicked = !e.target.className.includes(actionMenuClassName);
                if (isButtonClicked) closeMenu();
            }}
            className={`${actionMenuClassName} ${displayClass} ${overflowClass}`}
        >
            {children}
        </div>
    );
};

export default ActionMenuContent;
