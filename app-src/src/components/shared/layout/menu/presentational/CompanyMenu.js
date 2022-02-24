import React from 'react';

import CompanyMenuItemContainer from '../containers/CompanyMenuItemContainer';
import DropdownMenuItemContainer from '../containers/DropdownMenuItemContainer';
import MenuHeader from './MenuHeader';

const CompanyMenu = ({
    isFromHeadquarters,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    unreadCount,
    dismissMessages,
    isSubscribed,
    isClientAccess,
    handleGenerateQRCodesModal,
    shouldRestrictPayments,
    unreadReleaseNoteCount,
    isCompanySelection,
    isCompanyUser,
    companySettings,
}) => {
    const isCompanyUserOrSelecting = isCompanySelection || !isCompanyUser;
    return (
        <div className="menu">
            {isSubscribed && !isCompanyUserOrSelecting && (
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
                        {!!totalRequests && <span className="number">{totalRequests}</span>}
                        <i className="far fa-exchange-alt fa-fw icon" />
                        <span className={`menu-text ${totalCredits ? 'large' : ''}`}>
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
                        Clients
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/users-management/timesheets">
                        Timesheets
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/users-management/pin-tasks">
                        Pin Tasks
                    </CompanyMenuItemContainer>
                </>
            )}
            {!shouldRestrictPayments && !isCompanyUserOrSelecting && (
                <>
                    <MenuHeader title="Orders &amp; Subscriptions" />
                    <CompanyMenuItemContainer link="/company/invoices">
                        <i className="far fa-receipt fa-fw icon" />
                        <span className="menu-text"> Orders</span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/subscription">
                        <i className="far fa-money-check fa-fw icon" />
                        <span className="menu-text large">Subscription &amp; Credits</span>
                    </CompanyMenuItemContainer>
                </>
            )}

            {isSubscribed && !isCompanyUserOrSelecting && (
                <>
                    <MenuHeader title="Reports" />
                    <CompanyMenuItemContainer onClick={dismissMessages} link="/company/reports">
                        {!!unreadCount && <span className="number">{unreadCount}</span>}
                        <i className="far fa-file-chart-pie fa-fw icon" />
                        <span className={`menu-text ${unreadCount ? 'large' : ''}`}>
                            My Company Reports
                        </span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/tools/create-report">
                        <i className="far fa-file-edit fa-fw icon" />
                        <span className="menu-text">Create Report</span>
                    </CompanyMenuItemContainer>
                </>
            )}

            <MenuHeader title="Settings" />
            <CompanyMenuItemContainer link="/company/profile">
                <i className="far fa-user fa-fw icon" />
                <span className="menu-text"> My Profile</span>
            </CompanyMenuItemContainer>

            {!isCompanyUserOrSelecting && (
                <>
                    <CompanyMenuItemContainer link="/company/settings">
                        <i className="far fa-cogs fa-fw icon" />
                        <span className="menu-text"> Company Settings</span>
                    </CompanyMenuItemContainer>

                    <CompanyMenuItemContainer link="/company/tools/templates">
                        <i className="far fa-folders fa-fw icon" />
                        <span className="menu-text">My Templates</span>
                    </CompanyMenuItemContainer>
                    {!!companySettings?.isJobReferenceDropdownEnabled && (
                        <CompanyMenuItemContainer link="/company/job-references">
                            <i className="far fa-file-alt fa-fw icon" />
                            <span className="menu-text">Job References</span>
                        </CompanyMenuItemContainer>
                    )}
                </>
            )}
            {!isCompanyUserOrSelecting && (
                <>
                    <MenuHeader title="Tools" />
                    <CompanyMenuItemContainer link="/company/release-notes">
                        {!!unreadReleaseNoteCount && (
                            <span className="number">{unreadReleaseNoteCount}</span>
                        )}
                        <i className="far fa-flag fa-fw icon" />
                        <span className={`menu-text ${unreadReleaseNoteCount ? 'large' : ''}`}>
                            Release Notes
                        </span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/activity-log">
                        <i className="far fa-history fa-fw icon" />
                        <span className="menu-text"> Activity Log</span>
                    </CompanyMenuItemContainer>

                    <CompanyMenuItemContainer
                        link="/company/generate-qr-codes"
                        onClick={handleGenerateQRCodesModal}
                    >
                        <i className="far fa-qrcode fa-fw icon" />
                        <span className="menu-text"> Generate QR Codes</span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/company/company-documents">
                        <i className="far fa-file-pdf fa-fw icon" />
                        <span className="menu-text"> Company Documents</span>
                    </CompanyMenuItemContainer>

                    <CompanyMenuItemContainer link="/company/bug-report">
                        <i className="far fa-bug fa-fw icon" />
                        <span className="menu-text"> Bug Report</span>
                    </CompanyMenuItemContainer>
                </>
            )}

            {isSubscribed && !isCompanyUserOrSelecting && (
                <>
                    <CompanyMenuItemContainer link="/company/message-centre">
                        {!!unreadMessageCount && (
                            <span className="number">{unreadMessageCount}</span>
                        )}
                        <i className="far fa-envelope fa-fw icon" />
                        <span className={`menu-text ${unreadMessageCount ? 'large' : ''}`}>
                            Message Centre
                        </span>
                    </CompanyMenuItemContainer>

                    <CompanyMenuItemContainer link="/company/approved-companies">
                        <i className="far fa-check-circle fa-fw icon" />
                        <span className="menu-text">Bolster Approved Companies</span>
                    </CompanyMenuItemContainer>

                    <MenuHeader title="Support" />
                    <CompanyMenuItemContainer link="/company/user-guides">
                        <i className="far fa-video fa-fw icon" />
                        <span className="menu-text">User Guides</span>
                    </CompanyMenuItemContainer>
                    <CompanyMenuItemContainer link="/auth/terms">
                        <i className="fas fa-align-left fa-fw icon" />
                        <span className="menu-text"> Terms & Conditions</span>
                    </CompanyMenuItemContainer>
                </>
            )}

            <CompanyMenuItemContainer link="/company/company-selection">
                <i className="far fa-exchange fa-fw icon" />
                <span className="menu-text">Select Company</span>
            </CompanyMenuItemContainer>
            <CompanyMenuItemContainer link="#" logout={true}>
                <i className="far fa-sign-out-alt fa-fw icon" />
                <span className="menu-text">Logout</span>
            </CompanyMenuItemContainer>
        </div>
    );
};

export default CompanyMenu;
