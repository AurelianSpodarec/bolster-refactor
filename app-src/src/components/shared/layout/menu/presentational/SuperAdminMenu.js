import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import bolsterLogo from '../../../../../_content/images/icons/Bolsterlogo.svg';

const SuperAdminMenu = ({ superAdminNavMenuItems }) => {
    return (
        <div className="menu">
            <div className="nav-wrapper">
                {superAdminNavMenuItems.map((navItem, index) => (
                    <MenuItemContainer key={index} item={navItem} />
                ))}
            </div>

            <img src={bolsterLogo} alt="Bolster Logo" className="logo" />
        </div>
    );
};

export default SuperAdminMenu;
