import React from 'react';
import { Link } from 'react-router-dom';

import MenuItemContainer from '../containers/MenuItemContainer';
import AdminPinOptionsMenuItems from './AdminPinOptionsMenuItems';

const SuperAdminMenu = ({ logout, unreadRequests, unreadBugReports }) => (
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
        <MenuItemContainer link="/admin/user-creations">
            <i className="fa fa-user-plus icon" /> <span className="menu-text">User Creations</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/company-tracking">
            <i className="fa fa-building icon" />{' '}
            <span className="menu-text">Company Tracking</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/bug-reports">
            {!!unreadBugReports && <span className="number">{unreadBugReports}</span>}
            <i className="fa fa-bug icon" /> <span className="menu-text">Bug Reports</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/move-tool">
            <i className="fa fa-layer-group icon" /> <span className="menu-text">Move Tool</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/merge-tool">
            <i className="fa fa-code-merge icon" /> <span className="menu-text">Merge Tool</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/expiry-tool">
            <i className="fa fa-clock icon" /> <span className="menu-text">Expiry Tool</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/recently-extended">
            <i className="fa fa-history icon" />{' '}
            <span className="menu-text">Recently Extended Drawings</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/services">
            <i className="fa fa-folder-open icon" /> <span className="menu-text">Services</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/drawing-upload-log">
            <i className="fa fa-list icon" /> <span className="menu-text">Drawing Upload Log</span>
        </MenuItemContainer>

        <AdminPinOptionsMenuItems />
        <MenuItemContainer link="/admin/contact-submissions">
            {!!unreadRequests && <span className="number">{unreadRequests}</span>}
            <i className="far fa-phone icon" />{' '}
            <span className={`menu-text ${unreadRequests ? 'large' : ''}`}>
                Contact Submissions
            </span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/sos-management">
            <i className="fas fa-hands-helping icon" />
            <span className="menu-text">SOS Management</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/operative-alerts">
            <i className="fas fa-envelope icon" />
            <span className="menu-text">Operative Alerts</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/user-guides">
            <i className="far fa-book fa-fw icon" />
            <span className="menu-text">User guides</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/new-features">
            <i className="fas fa-file-medical icon" />
            <span className="menu-text">New Features</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/text-settings">
            <i className="far fa-cogs fa-fw icon" />
            <span className="menu-text">Frontend Text Settings</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/trusted-by-settings">
            <i className="far fa-book fa-fw icon" />
            <span className="menu-text">Frontend Trusted By Settings</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/legal-documents">
            <i className="far fa-file fa-fw icon" />
            <span className="menu-text">Legal Documents</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/demo-access-codes">
            <i className="far fa-key fa-fw icon" />
            <span className="menu-text">Demo Access Codes</span>
        </MenuItemContainer>
        <MenuItemContainer link="/admin/banners">
            <i className="fas fa-pennant icon" />
            <span className="menu-text">Banner Notifications</span>
        </MenuItemContainer>
        <Link className="item" to="#" link="/admin/users" onClick={logout}>
            <i className="icon fas fa-sign-out" />
            <span className="menu-text">Logout</span>
        </Link>
    </div>
);

export default SuperAdminMenu;
