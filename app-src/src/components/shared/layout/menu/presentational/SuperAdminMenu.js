import React from 'react';

import bolsterLogo from '../../../../../_content/images/footer/powered-by-bolster-white.svg';
import SuperAdminMenuItemContainer from '../containers/SuperAdminMenuItemContainer';

const SuperAdminMenu = ({ superAdminNavMenuItems, latestAppVersion }) => {
    return (
        <div className="menu">
            <div className="nav-wrapper">
                {superAdminNavMenuItems.map((navItem, index) => (
                    <SuperAdminMenuItemContainer key={index} item={navItem} />
                ))}
            </div>

            <div className="footer">
                <img src={bolsterLogo} alt="Powered by Bolster" />
                <p>App version: {latestAppVersion}</p>
            </div>
        </div>
    );
};

export default SuperAdminMenu;
