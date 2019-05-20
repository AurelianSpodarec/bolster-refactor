import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';
import DropdownMenuItems from './DropdownMenuItems';

const ClientMenu = () => (
    <>
        <div className="menu-bg" />
        <div className="menu">
            <MenuItemContainer link="/client">
                <i className="fa fa-home icon" /> Dashboard
            </MenuItemContainer>

            <MenuItemContainer link="/client/sites">
                <i className="fa fa-building icon" /> Sites
            </MenuItemContainer>
        </div>
    </>
);

export default ClientMenu;
