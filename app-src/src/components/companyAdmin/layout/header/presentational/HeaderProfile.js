import React from 'react';
import { Link } from 'react-router-dom';

import NoProfilePic from '_content/images/layout/blank-profile.png';
import { FILE_STORAGE_URL } from 'config';

const HeaderProfile = ({
    profile,
    popupVisible,
    handleClick,
    logout,
    updateNode,
    isImpersonating,
    companyName
}) => (
    <div className="profile" ref={updateNode}>
        <div className="user" onClick={handleClick}>
            {profile.profileImageS3Key ? (
                <img
                    alt="profile"
                    src={`${FILE_STORAGE_URL}/${profile.profileImageS3Key}`}
                />
            ) : (
                <img src={NoProfilePic} alt="generic profile" />
            )}
            {/* {todo: need to put FILE_STORAGE_URL on no profile pic and every image, when live. } */}
            <div className="text">
                <p>{`${profile.firstName} ${profile.lastName}`}</p>
                <span className="email">
                    {profile.email}{' '}
                    {/* todo: ##  impersonation needs stling ## */}
                    {isImpersonating ? `(impersonating ${companyName})` : ''}
                </span>
            </div>
            <i className="arrow fas fa-chevron-right" />
        </div>

        <div className={`options ${popupVisible ? 'visible' : ''}`}>
            <Link to="/company/profile" className="item">
                <i className="far fa-user fa-fw icon" />
                <span className="item-text">My Profile</span>

                <i className="icon fas fa-chevron-right right" />
            </Link>
            <Link to="/company/settings" className="item">
                <i className="far fa-cogs fa-fw icon" />
                <span className="item-text">Company Settings</span>

                <i className="icon fas fa-chevron-right right" />
            </Link>
            <Link to="/company/subscription" className="item">
                <i className="far fa-money-check fa-fw fa-fw icon" />
                <span className="item-text">Subscription &amp; Credits</span>

                <i className="icon fas fa-chevron-right right" />
            </Link>
            <Link to="/company/tools/credit-logs" className="item">
                <i className="far fa-scroll fa-fw icon" />

                <span className="item-text">Drawing Credit Log </span>

                <i className="icon fas fa-chevron-right right" />
            </Link>

            <Link to="/company/invoices" className="item">
                <i className="far fa-receipt fa-fw fa-fw icon" />
                <span className="item-text">Orders</span>

                <i className="icon fas fa-chevron-right right" />
            </Link>
            <Link to="/company/tools/company-reports" className="item">
                <i className="far fa-file-chart-pie fa-fw icon" />
                <span className="item-text">Reports</span>

                <i className="icon fas fa-chevron-right right" />
            </Link>
            <Link onClick={logout} to="#" className="item">
                <i className="icon far fa-sign-out fa-fw" />
                <span className="item-text">Logout</span>
                <i className="icon fas fa-chevron-right right" />
            </Link>
        </div>
    </div>
);

export default HeaderProfile;
