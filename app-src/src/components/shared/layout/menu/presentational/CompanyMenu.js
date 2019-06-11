import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';
import DropdownMenuItems from './DropdownMenuItems';
import MenuHeader from './MenuHeader';

const CompanyMenu = ({
    isFromHeadquarters,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    unreadCount,
    dismissMessages
}) => (
    <>
        <div className="menu-bg" />
        <div className="menu">
            <MenuHeader title="Dashboard" />
            <MenuItemContainer link="/company" base>
                <i className="far fa-home icon fa-fw" />

                <span className="menu-text">Dashboard</span>
            </MenuItemContainer>
            {isFromHeadquarters && (
                <DropdownMenuItemContainer
                    icon="city"
                    title={'Headquarters'}
                    baseUrl="/company/headquarters"
                >
                    <MenuItemContainer link="/company/headquarters">
                        <span className="menu-text">Companies</span>
                    </MenuItemContainer>
                </DropdownMenuItemContainer>
            )}

            <MenuHeader title="Site Management" />

            <MenuItemContainer link="/company/sites">
                <i className="far fa-building icon fa-fw" />
                <span className="menu-text"> Sites</span>
            </MenuItemContainer>

            <DropdownMenuItemContainer
                icon="users"
                title={'User Management'}
                baseUrl="/company/users-management"
            >
                <MenuItemContainer link="/company/users-management/company-admins">
                    Company Admins
                </MenuItemContainer>
                <MenuItemContainer link="/company/users-management/operatives">
                    Operatives
                </MenuItemContainer>
            </DropdownMenuItemContainer>

            <DropdownMenuItems />
            <MenuItemContainer link="/company/tools/transfer-requests">
                {!!totalRequests && (
                    <span className="number">{totalRequests}</span>
                )}
                <i className="far fa-exchange-alt fa-fw icon" />
                <span className={`menu-text ${totalCredits ? 'large' : ''}`}>
                    Requests &amp; Invites
                </span>
            </MenuItemContainer>
            <MenuHeader title="Orders &amp; Subscriptions" />
            <MenuItemContainer link="/company/invoices">
                <i className="far fa-receipt fa-fw icon" />
                <span className="menu-text"> Orders</span>
            </MenuItemContainer>
            <MenuItemContainer link="/company/subscription">
                <i className="far fa-money-check fa-fw icon" />
                <span className="menu-text large">
                    Subscription &amp; Credits
                </span>
            </MenuItemContainer>

            <MenuHeader title="Reports" />

            <MenuItemContainer
                onClick={dismissMessages}
                link="/company/reports"
            >
                {/* <MenuItemContainer link="/company/reports"> */}
                {!!unreadCount && <span className="number">{unreadCount}</span>}
                <i className="far fa-file-chart-pie fa-fw icon" />
                <span className={`menu-text ${unreadCount ? 'large' : ''}`}>
                    My Company Reports
                </span>
            </MenuItemContainer>
            <MenuItemContainer link="/company/tools/create-report">
                <i className="far fa-file-edit fa-fw icon" />
                <span className="menu-text">Create Report</span>
            </MenuItemContainer>
            <MenuHeader title="Settings &amp; Tools" />
            <MenuItemContainer link="/company/profile">
                <i className="far fa-user fa-fw icon" />
                <span className="menu-text"> My Profile</span>
            </MenuItemContainer>
            <MenuItemContainer link="/company/settings">
                <i className="far fa-cogs fa-fw icon" />
                <span className="menu-text"> Company Settings</span>
            </MenuItemContainer>

            <MenuItemContainer link="/company/message-centre">
                {!!unreadMessageCount && (
                    <span className="number">{unreadMessageCount}</span>
                )}
                <i className="far fa-envelope fa-fw icon" />
                <span
                    className={`menu-text ${unreadMessageCount ? 'large' : ''}`}
                >
                    Message Centre
                </span>
            </MenuItemContainer>
            <MenuItemContainer link="/company/tools/operative-alerts">
                <i className="far fa-bells fa-fw icon" />
                <span className="menu-text">Operative Alerts</span>
            </MenuItemContainer>

            <MenuItemContainer link="/company/tools/templates">
                <i className="far fa-folders fa-fw icon" />
                <span className="menu-text">My Templates</span>
            </MenuItemContainer>

            <MenuItemContainer link="/company/tools/support">
                <i className="far fa-info-circle fa-fw icon" />
                <span className="menu-text">Support</span>
            </MenuItemContainer>
            <MenuItemContainer link="/company/approved-companies">
                <i className="far fa-check-circle fa-fw icon" />
                <span className="menu-text">Bolster Approved Companies</span>
            </MenuItemContainer>
            <MenuItemContainer link="https://vimeo.com/bolstersystems" external>
                <i className="far fa-video fa-fw icon" />
                <span className="menu-text">User Guides</span>
            </MenuItemContainer>

            <MenuItemContainer link="#" logout={true}>
                <i className="far fa-sign-out-alt fa-fw icon" />
                <span className="menu-text">Logout</span>
            </MenuItemContainer>
        </div>
    </>
);

export default CompanyMenu;
