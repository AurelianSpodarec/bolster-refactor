import React from 'react';

import { clientNavMenuItems } from '../../../../../constants/client/menuItems';
import MenuItemContainer from '../containers/MenuItemContainer';
import bolsterLogo from '../../../../../_content/images/icons/Bolsterlogo.svg';

const ClientMenu = ({ dismissMessages, unreadCount, isCompany }) => (
    <div className="menu">
        <div className="nav-wrapper">
            {clientNavMenuItems.map((navItem, index) => (
                <MenuItemContainer key={index} item={navItem} />
            ))}
        </div>

        <img src={bolsterLogo} alt="Bolster Logo" className="logo" />
    </div>
);

export default ClientMenu;
