import React from 'react';
import { Link } from 'react-router-dom';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const Menu = () => (
    <div className="menu size-lg-3">
        <MenuItemContainer link="/">
            <i className="fa fa-home icon" /> Dashboard
        </MenuItemContainer>
        <MenuItemContainer link="/sites">
            <i className="fa fa-building icon" /> Sites
        </MenuItemContainer>

        <DropdownMenuItemContainer icon="users" title={'User Management'}>
            <MenuItemContainer link="/sites">Admins</MenuItemContainer>
            <MenuItemContainer link="/sites">Users</MenuItemContainer>
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
        <DropdownMenuItemContainer icon="wrench" title={'Tools & Resources'}>
            <MenuItemContainer link="/sites">
                Drawing Credit Log
            </MenuItemContainer>
            <MenuItemContainer link="/sites">Pin Options</MenuItemContainer>
            <MenuItemContainer link="/sites">Support</MenuItemContainer>
        </DropdownMenuItemContainer>
    </div>
);

export default Menu;
