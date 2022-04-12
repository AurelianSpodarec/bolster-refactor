import React, { useState } from 'react';

import useClickOutside from 'hooks/useClickOutside';
import ActionMenuContent from './ActionMenuContent';

const ActionMenu = ({ children, ellipsisPosition = 'right', disabled = false }) => {
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => {
        setShowMenu(false);
    };

    const ref = useClickOutside(closeMenu);

    return (
        <div className="action-menu-wrapper flex-row">
            <button
                className="ellipsis-button"
                data-position={ellipsisPosition}
                onClick={e => {
                    e.preventDefault();
                    if (!disabled) setShowMenu(true);
                }}
            >
                <i className="fa fa-ellipsis-v" />
            </button>

            <div ref={ref}>
                {showMenu && (
                    <ActionMenuContent closeMenu={closeMenu}>{children}</ActionMenuContent>
                )}
            </div>
        </div>
    );
};

export default ActionMenu;
