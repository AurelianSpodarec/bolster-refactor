import React, { useState } from 'react';

import bolsterLogo from '../../../../../_content/images/footer/powered-by-bolster-red.svg';
import bolsterLogoDarkMode from '../../../../../_content/images/footer/powered–by-bolster-white.svg';
import SuperAdminMenuItemContainer from '../containers/SuperAdminMenuItemContainer';
import useColourTheme from '../../../../../hooks/useColourTheme';

const SuperAdminMenu = ({ superAdminNavMenuItems, latestAppVersion }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const colourTheme = useColourTheme();

    return (
        <div className="menu">
            <div className="nav-wrapper">
                {superAdminNavMenuItems.map((navItem, index) => (
                    <SuperAdminMenuItemContainer
                        key={index}
                        item={navItem}
                        hoveredItem={hoveredItem}
                        setHoveredItem={setHoveredItem}
                    />
                ))}
            </div>

            <div className="nav-footer">
                <img
                    src={colourTheme === 'dark' ? bolsterLogoDarkMode : bolsterLogo}
                    alt="Powered by Bolster"
                />
                <p>App version: {latestAppVersion}</p>
            </div>
        </div>
    );
};

export default SuperAdminMenu;
