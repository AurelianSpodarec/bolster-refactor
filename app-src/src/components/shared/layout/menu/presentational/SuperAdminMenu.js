import React from 'react';

import bolsterLogo from '../../../../../_content/images/footer/powered-by-bolster-white.svg';
import SuperAdminMenuItemContainer from '../containers/SuperAdminMenuItemContainer';

const SuperAdminMenu = ({ superAdminNavMenuItems }) => {
    return (
        <div className="menu">
            <div className="nav-wrapper">
                {superAdminNavMenuItems.map((navItem, index) => (
                    <SuperAdminMenuItemContainer key={index} item={navItem} />
                ))}
            </div>

            <img src={bolsterLogo} alt="Bolster Logo" className="logo" />
        </div>
    );
};

export default SuperAdminMenu;
