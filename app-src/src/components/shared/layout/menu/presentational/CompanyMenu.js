import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';
import DropdownMenuItems from './DropdownMenuItems';
import MenuHeader from './MenuHeader';

const CompanyMenu = ({ isFromHeadquarters }) => (
    <>
        <div className="menu-bg" />
        <div className="menu">
            <MenuItemContainer link="/company">
                <i className="far fa-home icon" /> Dashboard
            </MenuItemContainer>
            {isFromHeadquarters && (
                <DropdownMenuItemContainer
                    icon="city"
                    title={'Headquarters'}
                    baseUrl="/company/headquarters"
                >
                    <MenuItemContainer link="/company/headquarters">
                        Companies
                    </MenuItemContainer>
                </DropdownMenuItemContainer>
            )}

            <MenuHeader title="Site Management" />

            <MenuItemContainer link="/company/sites">
                <i className="far fa-building icon" /> Sites
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
                <i className="far fa-exchange-alt icon" />
                Requests & Invites
            </MenuItemContainer>
            <MenuHeader title="Orders & Subsctiptions" />
            <MenuItemContainer link="/company/invoices">
                <i className="far fa-receipt icon" />
                Orders
            </MenuItemContainer>
            <MenuItemContainer link="/company/subscription">
                <i className="far fa-money-check icon" />
                Subscriptions & Drawing Credits
            </MenuItemContainer>
            <MenuItemContainer link="/company/tools/credit-logs">
                <i className="far fa-scroll icon" />
                Drawing Credit Log
            </MenuItemContainer>
            <MenuHeader title="Reports" />

            <MenuItemContainer link="/company/reports">
                {/* <MenuItemContainer link="/company/reports"> */}
                <i className="far fa-file-chart-pie icon" /> Reports
            </MenuItemContainer>
            <MenuHeader title="Settings & Tools" />
            <MenuItemContainer link="/company/profile">
                <i className="far fa-user icon" /> My Profile
            </MenuItemContainer>
            <MenuItemContainer link="/company/settings">
                <i className="far fa-cogs icon" /> Company Settings
            </MenuItemContainer>

            <MenuItemContainer link="/company/message-centre">
                <i className="far fa-envelope icon" />
                Message Centre
            </MenuItemContainer>
            <MenuItemContainer link="/company/tools/operative-alerts">
                <i className="far fa-bells icon" />
                Operative Alerts
            </MenuItemContainer>

            <MenuItemContainer link="/company/tools/templates">
                <i className="far fa-folders icon" />
                My Templates
            </MenuItemContainer>

            <MenuItemContainer link="/company/tools/support">
                <i className="far fa-info-circle icon" />
                Support
            </MenuItemContainer>
            <MenuItemContainer link="/company/approved-companies">
                <i className="far fa-check-circle icon" />
                Bolster Approved Companies
            </MenuItemContainer>
            <MenuItemContainer link="https://vimeo.com/bolstersystems" external>
                <i className="far fa-video icon" />
                User Guides
            </MenuItemContainer>

            <MenuItemContainer link="#" logout={true}>
                <i className="far fa-sign-out-alt icon" />
                Logout
            </MenuItemContainer>
        </div>
    </>
);

export default CompanyMenu;
