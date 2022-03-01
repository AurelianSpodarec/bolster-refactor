import React from 'react';

import { superAdminNavMenuItems } from '../../../../../constants/superAdmin/menuItems';
import MenuItemContainer from '../containers/MenuItemContainer';

const SuperAdminMenu = ({ unreadRequests, unreadBugReports }) => {
    return (
        <div className="menu">
            <div className="nav-wrapper">
                {superAdminNavMenuItems.map((navItem, index) => (
                    <MenuItemContainer key={index} item={navItem} />
                ))}
            </div>
        </div>
    );
};

export default SuperAdminMenu;
