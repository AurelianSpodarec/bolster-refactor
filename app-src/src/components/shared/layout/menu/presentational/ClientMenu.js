import React from 'react';

import { clientNavMenuItems } from '../../../../../constants/client/menuItems';
import MenuItemContainer from '../containers/MenuItemContainer';

const ClientMenu = ({ dismissMessages, unreadCount, isCompany }) => (
    <div className="menu">
        <div className="nav-wrapper">
            {clientNavMenuItems.map((navItem, index) => (
                <MenuItemContainer key={index} item={navItem} />
            ))}
        </div>
    </div>
);

export default ClientMenu;
