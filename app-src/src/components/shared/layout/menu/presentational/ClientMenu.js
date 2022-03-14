import React, { useState } from 'react';

import bolsterLogo from '../../../../../_content/images/footer/powered-by-bolster-red.svg';
import ClientMenuItemContainer from '../containers/ClientMenuItemContainer';

const ClientMenu = ({ clientNavMenuItems, latestAppVersion }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <div className="menu">
            <div className="nav-wrapper">
                {clientNavMenuItems.map((navItem, index) => (
                    <ClientMenuItemContainer
                        key={index}
                        item={navItem}
                        hover={hoveredItem === navItem.name}
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

export default ClientMenu;
