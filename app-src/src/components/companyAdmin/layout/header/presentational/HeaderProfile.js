import React, { useRef } from 'react';
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
}) => {
    const ref = useRef(null);
    return (
        <div className="item">
            <div ref={ref} className="user" onClick={handleClick}>
                {profile.profileImageS3Key ? (
                    <img alt="profile" src={`${FILE_STORAGE_URL}/${profile.profileImageS3Key}`} />
                ) : (
                    <div>
                        {profile.firstName &&
                            profile.firstName[0] + profile.lastName &&
                            profile?.lastName[0]}
                    </div>
                )}
            </div>

            <div className="profile-menu">
                <div className="profile-options">
                    <Link to="/company/profile" className="dropdown-item">
                        <i className="far fa-user fa-fw icon" />
                        <span className="item-text">My Profile</span>
                    </Link>
                    <Link to="/company/company-selection" className="dropdown-item">
                        <i className="icon far fa-exchange fa-fw" />
                        <span className="item-text">Select Company</span>
                    </Link>
                    <Link onClick={logout} to="#" className="dropdown-item">
                        <i className="icon far fa-sign-out fa-fw" />
                        <span className="item-text">Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeaderProfile;
