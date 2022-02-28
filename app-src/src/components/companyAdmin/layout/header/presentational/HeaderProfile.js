import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';

const HeaderProfile = ({
    profile,
    popupVisible,
    handleClick,
    logout,
    isImpersonating,
    companyName,
    isSubscribed,
    shouldRestrictPayments,
    isCompanyUserOrSelecting,
}) => (
    <div className="item">
        <div className="user" onClick={handleClick}>
            {profile.profileImageS3Key ? (
                <img alt="profile" src={`${FILE_STORAGE_URL}/${profile.profileImageS3Key}`} />
            ) : (
                <div>
                    {profile.firstName &&
                        profile.firstName[0] + profile.lastName &&
                        profile?.lastName[0]}
                </div>
            )}
            {/* <div className="text">
                <p>{`${profile.firstName} ${profile.lastName}`}</p>
                <span className="email">
                    {profile.email} {isImpersonating ? `(impersonating ${companyName})` : ''}
                </span>
            </div> */}
        </div>

        {/* <div className={`options ${popupVisible ? 'visible' : ''}`}>
            <Link to="/company/profile" className="item">
                <i className="far fa-user fa-fw icon" />
                <span className="item-text">My Profile</span>

                <i className="icon fas fa-chevron-right right" />
            </Link>
            {!isCompanyUserOrSelecting && (
                <Link to="/company/settings" className="item">
                    <i className="far fa-cogs fa-fw icon" />
                    <span className="item-text">Company Settings</span>

                    <i className="icon fas fa-chevron-right right" />
                </Link>
            )}
            {!shouldRestrictPayments && !isCompanyUserOrSelecting && (
                <>
                    <Link to="/company/subscription" className="item">
                        <i className="far fa-money-check fa-fw fa-fw icon" />
                        <span className="item-text">Subscription &amp; Credits</span>

                        <i className="icon fas fa-chevron-right right" />
                    </Link>
                    <Link to="/company/invoices" className="item">
                        <i className="far fa-receipt fa-fw fa-fw icon" />
                        <span className="item-text">Orders</span>

                        <i className="icon fas fa-chevron-right right" />
                    </Link>
                </>
            )}

            {isSubscribed && !isCompanyUserOrSelecting && (
                <>
                    <Link to="/company/tools/credit-logs" className="item">
                        <i className="far fa-scroll fa-fw icon" />

                        <span className="item-text">Drawing Credit Log </span>

                        <i className="icon fas fa-chevron-right right" />
                    </Link>

                    <Link to="/company/tools/company-reports" className="item">
                        <i className="far fa-file-chart-pie fa-fw icon" />
                        <span className="item-text">Reports</span>

                        <i className="icon fas fa-chevron-right right" />
                    </Link>
                </>
            )}
            {!isCompanyUserOrSelecting && (
                <Link to="/company/recently-deleted" className="item">
                    <i className="far fa-trash fa-fw icon" />

                    <span className="item-text">Recently Deleted</span>

                    <i className="icon fas fa-chevron-right right" />
                </Link>
            )}

            <Link to="/company/company-selection" className="item">
                <i className="icon far fa-exchange fa-fw" />
                <span className="item-text">Select Company</span>
                <i className="icon fas fa-chevron-right right" />
            </Link>
            <Link onClick={logout} to="#" className="item">
                <i className="icon far fa-sign-out fa-fw" />
                <span className="item-text">Logout</span>
                <i className="icon fas fa-chevron-right right" />
            </Link>
        </div> */}
    </div>
);

export default HeaderProfile;
