import React from 'react';

import CompanyMenuItemContainer from '../containers/CompanyMenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';
import CompanyDropdownMenuItems from './CompanyDropdownMenuItems';
import MenuHeader from './MenuHeader';

const CompanyMenu = ({
    isFromHeadquarters,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    unreadCount,
    dismissMessages,
    isSubscribed,
    openHelpScout,
    isClientAccess,
    handleGenerateQRCodesModal,
    shouldRestrictPayments
}) => (
    <>
        <div className="menu">
            {isSubscribed && (
                <>
                    <CompanyMenuItemContainer link="/company" base>
                        <i className="far fa-home icon fa-fw" />

                        <span className="menu-text">Dashboard</span>
                    </CompanyMenuItemContainer>

                    {isFromHeadquarters && (
                        <DropdownMenuItemContainer
                            icon="city"
                            title={'Headquarters'}
                            baseUrl="/company/headquarters"
                        >
                            <CompanyMenuItemContainer link="/company/headquarters">
                                <span className="menu-text">Companies</span>
                            </CompanyMenuItemContainer>
                        </DropdownMenuItemContainer>
                    )}

                    <MenuHeader title="Site Management" />
                    <CompanyMenuItemContainer link="/company/sites">
                        <i className="far fa-building icon fa-fw" />
                        <span className="menu-text"> Sites</span>
                    </CompanyMenuItemContainer>

                    <CompanyMenuItemContainer link="/company/tools/transfer-requests">
                        {!!totalRequests && (
                            <span className="number">{totalRequests}</span>
                        )}
                        <i className="far fa-exchange-alt fa-fw icon" />
                        <span
                            className={`menu-text ${
                                totalCredits ? 'large' : ''
                            }`}
                        >
                            Requests &amp; Invites
                        </span>
                    </CompanyMenuItemContainer>
                    {isClientAccess && (
                        <CompanyMenuItemContainer link="/client/companies">
                            <i className="fal fa-clipboard-list-check icon fa-fw" />
                            <span className="menu-text"> Invited Access</span>
                        </CompanyMenuItemContainer>
                    )}
                    <MenuHeader title="User Management" />
                    <CompanyMenuItemContainer link="/company/users-management/company-admins">
                        Admins
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/users-management/operatives">
                        Operatives
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/users-management/clients">
                        Client Access
                    </CompanyMenuItemContainer>

                    <CompanyDropdownMenuItems />
                </>
            )}
            {!shouldRestrictPayments && (
                <>
                    <MenuHeader title="Orders &amp; Subscriptions" />
                    <CompanyMenuItemContainer link="/company/invoices">
                        <i className="far fa-receipt fa-fw icon" />
                        <span className="menu-text"> Orders</span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/subscription">
                        <i className="far fa-money-check fa-fw icon" />
                        <span className="menu-text large">
                            Subscription &amp; Credits
                        </span>
                    </CompanyMenuItemContainer>
                </>
            )}

            {isSubscribed && (
                <>
                    <MenuHeader title="Reports" />

                    <CompanyMenuItemContainer
                        onClick={dismissMessages}
                        link="/company/reports"
                    >
                        {/* <CompanyMenuItemContainer link="/company/reports"> */}
                        {!!unreadCount && (
                            <span className="number">{unreadCount}</span>
                        )}
                        <i className="far fa-file-chart-pie fa-fw icon" />
                        <span
                            className={`menu-text ${
                                unreadCount ? 'large' : ''
                            }`}
                        >
                            My Company Reports
                        </span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/tools/create-report">
                        <i className="far fa-file-edit fa-fw icon" />
                        <span className="menu-text">Create Report</span>
                    </CompanyMenuItemContainer>
                </>
            )}

            <MenuHeader title="Settings &amp; Tools" />
            <CompanyMenuItemContainer link="/company/profile">
                <i className="far fa-user fa-fw icon" />
                <span className="menu-text"> My Profile</span>
            </CompanyMenuItemContainer>

            <CompanyMenuItemContainer link="/company/settings">
                <i className="far fa-cogs fa-fw icon" />
                <span className="menu-text"> Company Settings</span>
            </CompanyMenuItemContainer>

            <CompanyMenuItemContainer
                link="/company/generate-qr-codes"
                onClick={handleGenerateQRCodesModal}
            >
                <i className="far fa-qrcode fa-fw icon" />
                <span className="menu-text"> Generate QR Codes</span>
            </CompanyMenuItemContainer>

            {isSubscribed && (
                <>
                    <CompanyMenuItemContainer link="/company/message-centre">
                        {!!unreadMessageCount && (
                            <span className="number">{unreadMessageCount}</span>
                        )}
                        <i className="far fa-envelope fa-fw icon" />
                        <span
                            className={`menu-text ${
                                unreadMessageCount ? 'large' : ''
                            }`}
                        >
                            Message Centre
                        </span>
                    </CompanyMenuItemContainer>
                    {/* OLD LINK <MenuItemContainer link="/company/tools/operative-alerts">
                <i className="far fa-bells fa-fw icon" />
                <span className="menu-text">Operative Alerts</span>
            </MenuItemContainer> */}

                    <CompanyMenuItemContainer link="/company/tools/templates">
                        <i className="far fa-folders fa-fw icon" />
                        <span className="menu-text">My Templates</span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer
                        link="/company/tools/support"
                        onClick={e => openHelpScout(e)}
                    >
                        <i className="far fa-info-circle fa-fw icon" />
                        <span className="menu-text">Support</span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/terms">
                        <i className="fas fa-align-left fa-fw icon" />
                        <span className="menu-text"> Terms & Conditions</span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/approved-companies">
                        <i className="far fa-check-circle fa-fw icon" />
                        <span className="menu-text">
                            Bolster Approved Companies
                        </span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer
                        link="https://vimeo.com/bolstersystems"
                        external
                    >
                        <i className="far fa-video fa-fw icon" />
                        <span className="menu-text">User Guides</span>
                    </CompanyMenuItemContainer>
                </>
            )}
            <CompanyMenuItemContainer link="#" logout={true}>
                <i className="far fa-sign-out-alt fa-fw icon" />
                <span className="menu-text">Logout</span>
            </CompanyMenuItemContainer>
        </div>
    </>
);

export default CompanyMenu;
