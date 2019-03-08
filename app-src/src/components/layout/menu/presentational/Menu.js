import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const Menu = ({ messageCount }) => (
    <div className="menu">
        <MenuItemContainer link="/">
            <i className="fa fa-home icon" /> Dashboard
        </MenuItemContainer>

        <MenuItemContainer link="/sites">
            <i className="fa fa-building icon" /> Sites
        </MenuItemContainer>

        <DropdownMenuItemContainer
            icon="users"
            title={'User Management'}
            baseUrl="/user-management"
        >
            <MenuItemContainer link="/user-management/admins">
                Admins
            </MenuItemContainer>
            <MenuItemContainer link="/user-management/users">
                Users
            </MenuItemContainer>
        </DropdownMenuItemContainer>

        <MenuItemContainer link="/reports">
            <i className="fa fa-file icon" /> Reports
        </MenuItemContainer>

        <MenuItemContainer link="/messages">
            <span className="messages">
                <i className="far fa-envelope" />
                <sub>{messageCount}</sub>
            </span>
            Message Centre
        </MenuItemContainer>

        <DropdownMenuItemContainer
            icon="wrench"
            title={'Tools & Resources'}
            baseUrl="/tools"
        >
            <MenuItemContainer link="/tools/credit-logs">
                Drawing Credit Log
            </MenuItemContainer>
            <MenuItemContainer link="/tools/pin-options">
                Pin Options
            </MenuItemContainer>
            <MenuItemContainer link="/tools/support">Support</MenuItemContainer>
        </DropdownMenuItemContainer>
    </div>
);

export default Menu;
