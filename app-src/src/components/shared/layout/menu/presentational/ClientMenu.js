import React from 'react';

import { clientNavMenuItems } from '../../../../../constants/client/actionTypes/menuItems';
import MenuItemContainer from '../containers/MenuItemContainer';

const ClientMenu = ({ dismissMessages, unreadCount, isCompany }) => (
    <div className="menu">
        {clientNavMenuItems.map((navItem, index) => {
            return <MenuItemContainer key={index} item={navItem} />;
        })}
    </div>
);

export default ClientMenu;
