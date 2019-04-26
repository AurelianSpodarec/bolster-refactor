import React from 'react';
import { Link } from 'react-router-dom';

import MenuItemContainer from '../containers/MenuItemContainer';
// import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const SuperAdminMenu = ({ logout }) => (
    <>
        <div className="menu-bg" />

        <div className="menu">
            <MenuItemContainer link="/admin">
                <i className="fa fa-home icon" /> Dashboard
            </MenuItemContainer>

            <MenuItemContainer link="/admin/generation-queue">
                <i className="far fa-file-export icon" /> Generation Queue
            </MenuItemContainer>

            <MenuItemContainer link="/admin/invoices">
                <i className="fa fa-file icon" /> Invoices
            </MenuItemContainer>

            <MenuItemContainer link="/admin/companies">
                <i className="fa fa-users icon" /> Companies
            </MenuItemContainer>
            <MenuItemContainer link="/admin/users">
                <i className="fa fa-user icon" /> Users
            </MenuItemContainer>
            <MenuItemContainer link="/admin/services">
                ## Services ##
            </MenuItemContainer>
            <Link className="item" to="#" link="/admin/users" onClick={logout}>
                <i className="icon fas fa-sign-out" />
                Logout
            </Link>
        </div>
    </>
);

export default SuperAdminMenu;
