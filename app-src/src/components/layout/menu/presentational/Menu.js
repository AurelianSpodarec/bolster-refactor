import React from 'react';
import { Link } from 'react-router-dom';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const Menu = () => (
    <div className="menu size-lg-3">
        <MenuItemContainer link="/dashboard">
            <i className="fa fa-home icon" /> Dashboard
        </MenuItemContainer>
        <MenuItemContainer link="/sites">
            <i className="fa fa-building icon" /> Sites
        </MenuItemContainer>

        <DropdownMenuItemContainer icon="users" title={'User Management'} baseUrl="/user-management">
            <MenuItemContainer link="/user-management/admins">Admins</MenuItemContainer>
            <MenuItemContainer link="/user-management/users">Users</MenuItemContainer>
        </DropdownMenuItemContainer>

        <MenuItemContainer link="/sites">
            <i className="fa fa-file icon" /> Reports
        </MenuItemContainer>

        <div className="item">
            <Link to="/Messages">
                <span className="messages">
                    <i className="far fa-envelope" />
                    <sub>1</sub>
                </span>
                Message Centre
            </Link>
        </div>
        <DropdownMenuItemContainer icon="wrench" title={'Tools & Resources'} baseUrl="/tools">
            <MenuItemContainer link="/tools/drawing-credit-logs">
                Drawing Credit Log
            </MenuItemContainer>
            <MenuItemContainer link="/tools/pin-options">Pin Options</MenuItemContainer>
            <MenuItemContainer link="/tools/support">Support</MenuItemContainer>
        </DropdownMenuItemContainer>
    </div>
);

export default Menu;
