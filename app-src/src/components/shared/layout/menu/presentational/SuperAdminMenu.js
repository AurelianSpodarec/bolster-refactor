import React from 'react';
import { Link } from 'react-router-dom';

import MenuItemContainer from '../containers/MenuItemContainer';
// import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const SuperAdminMenu = ({ logout }) => (
    <>
        <div className="menu">
            <MenuItemContainer link="/admin" base>
                <i className="fa fa-home icon" />{' '}
                <span className="menu-text">Dashboard</span>
            </MenuItemContainer>

            <MenuItemContainer link="/admin/company-reports">
                <i className="far fa-file-export icon" />{' '}
                <span className="menu-text">Company Reports</span>
            </MenuItemContainer>

            <MenuItemContainer link="/admin/invoices">
                <i className="fa fa-file icon" />{' '}
                <span className="menu-text">Invoices</span>
            </MenuItemContainer>

            <MenuItemContainer link="/admin/companies">
                <i className="fa fa-users icon" />{' '}
                <span className="menu-text">Companies</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/users">
                <i className="fa fa-user icon" />{' '}
                <span className="menu-text">Users</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/services">
                <i className="fa fa-folder-open icon" />{' '}
                <span className="menu-text">Services</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/demo-requests">
                <i className="far fa-video icon" />{' '}
                <span className="menu-text">User Demo Requests</span>
            </MenuItemContainer>
            <Link className="item" to="#" link="/admin/users" onClick={logout}>
                <i className="icon fas fa-sign-out" />
                <span className="menu-text">Logout</span>
            </Link>
        </div>
    </>
);

export default SuperAdminMenu;
