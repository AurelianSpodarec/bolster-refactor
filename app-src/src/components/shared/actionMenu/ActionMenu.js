import React, { useState } from 'react';

import useClickOutside from 'hooks/useClickOutside';
import ActionMenuContent from './ActionMenuContent';

const ActionMenu = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => {
        setShowMenu(false);
    };

    const ref = useClickOutside(closeMenu);

    return (
        <>
            <div
                className="flex flex-row justify-center align-center ellipsis"
                onClick={() => setShowMenu(true)}
            >
                <i className="fa fa-ellipsis-v" />
            </div>

            <div ref={ref} className="action-menu-wrapper">
                {showMenu && <ActionMenuContent>{children}</ActionMenuContent>}
            </div>
        </>
    );
};

export default ActionMenu;
