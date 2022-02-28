import React from 'react';

import { superAdminNavMenuItems } from '../../../../../constants/superAdmin/menuItems';
import MenuItemContainer from '../containers/MenuItemContainer';

const SuperAdminMenu = ({ unreadRequests, unreadBugReports }) => {
    return (
        <div className="menu">
            {superAdminNavMenuItems.map((navItem, index) => {
                return <MenuItemContainer key={index} item={navItem} />;
            })}
        </div>
    );
};

export default SuperAdminMenu;
