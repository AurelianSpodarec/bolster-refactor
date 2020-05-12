import React from 'react';
import { Link } from 'react-router-dom';

import MenuItemContainer from '../containers/MenuItemContainer';
import {
    DROPDOWN_OPTION_VALS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
    DROPDOWN_OPTION_ENUM,
    DROPDOWN_OPTIONS,
} from 'constants/companyAdmin/enums';

// import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';

const SuperAdminMenu = ({ logout }) => (
    <>
        <div className="menu">
            <MenuItemContainer link="/admin" base>
                <i className="fa fa-home icon" /> <span className="menu-text">Dashboard</span>
            </MenuItemContainer>

            <MenuItemContainer link="/admin/company-reports">
                <i className="far fa-file-export icon" />{' '}
                <span className="menu-text">Company Reports</span>
            </MenuItemContainer>

            <MenuItemContainer link="/admin/invoices">
                <i className="fa fa-file icon" /> <span className="menu-text">Invoices</span>
            </MenuItemContainer>

            <MenuItemContainer link="/admin/companies">
                <i className="fa fa-users icon" /> <span className="menu-text">Companies</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/users">
                <i className="fa fa-user icon" /> <span className="menu-text">Users</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/move-tool">
                <i className="fa fa-layer-group icon" />{' '}
                <span className="menu-text">Move Tool</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/merge-tool">
                <i className="fa fa-code-merge icon" />{' '}
                <span className="menu-text">Merge Tool</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/services">
                <i className="fa fa-folder-open icon" /> <span className="menu-text">Services</span>
            </MenuItemContainer>

            {Object.values(DROPDOWN_OPTION_VALS).map(option => {
                return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option] ? (
                    <MenuItemContainer link={`/admin/pin-options/${DROPDOWN_OPTIONS[option].link}`}>
                        <i className="fa fa-wrench icon" />{' '}
                        <span className="menu-text">{DROPDOWN_OPTION_ENUM[option]}</span>
                    </MenuItemContainer>
                ) : null;
            })}
            <MenuItemContainer link="/admin/enquiries">
                <i className="far fa-phone icon" />{' '}
                <span className="menu-text">User Enquiries</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/demo-requests">
                <i className="far fa-video icon" />{' '}
                <span className="menu-text">User Demo Requests</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/sos-management">
                <i className="fas fa-hands-helping icon" />
                <span className="menu-text">SOS Management</span>
            </MenuItemContainer>
            <MenuItemContainer link="/admin/operative-alerts">
                <i className="fas fa-envelope icon" />
                <span className="menu-text">Operative Alerts</span>
            </MenuItemContainer>
            <Link className="item" to="#" link="/admin/users" onClick={logout}>
                <i className="icon fas fa-sign-out" />
                <span className="menu-text">Logout</span>
            </Link>
        </div>
    </>
);

export default SuperAdminMenu;
