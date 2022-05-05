import React, { useState } from 'react';

import useClickOutside from 'hooks/useClickOutside';
import ActionMenuContent from './ActionMenuContent';
import HamburgerMenuIcon from '../../../_content/images/icons/hamburger-menu-icon.svg';
import HamburgerMenuIconLight from '../../../_content/images/icons/hamburger-menu-icon-light.svg';
import useColourTheme from 'hooks/useColourTheme';

const ActionMenu = ({ children, ellipsisPosition = 'right', disabled = false }) => {
    const colourTheme = useColourTheme();
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
                    e.stopPropagation();
                    setShowMenu(true);
                }}
                disabled={disabled}
            >
                <img
                    src={colourTheme === 'dark' ? HamburgerMenuIconLight : HamburgerMenuIcon}
                    alt="menu-icon"
                />
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
