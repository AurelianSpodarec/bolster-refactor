import React, { useState } from 'react';

import bolsterLogo from '../../../../../_content/images/footer/powered–by-bolster-white.svg';
import SuperAdminMenuItemContainer from '../containers/SuperAdminMenuItemContainer';

const SuperAdminMenu = ({ superAdminNavMenuItems, latestAppVersion }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

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
                <img src={bolsterLogo} alt="Powered by Bolster" />
                <p>App version: {latestAppVersion}</p>
            </div>
        </div>
    );
};

export default SuperAdminMenu;
