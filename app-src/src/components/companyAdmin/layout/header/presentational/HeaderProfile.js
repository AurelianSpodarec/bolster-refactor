import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import ProfileIcon from '../../../../../_content/images/icons/profile.png';
import ExchangeIcon from '../../../../../_content/images/icons/exchange-in-user-profile.png';
import LogoutIcon from '../../../../../_content/images/icons/logout.png';
import defaultStyles from 'constants/defaultStyles';

const HeaderProfile = ({ profile, handleClick, logout, companyUserID, companyColour }) => {
    const ref = useRef(null);
    return (
        <div className="item profile-container">
            <div
                ref={ref}
                className="user"
                onClick={handleClick}
                style={{
                    backgroundColor: companyUserID ? companyColour : defaultStyles.colourCode,
                }}
            >
                {profile.profileImageS3Key ? (
                    <img alt="profile" src={`${FILE_STORAGE_URL}/${profile.profileImageS3Key}`} />
                ) : (
                    <div>
                        {profile.firstName &&
                            profile.firstName[0] + profile.lastName &&
                            profile?.lastName[0]}
                    </div>
                )}
                <div className="user-icon-menu-wrapper"></div>
            </div>

            <div className="profile-menu">
                <div
                    className="profile-options"
                    // style={{
                    //     backgroundColor: companyUserID ? companyColour : defaultStyles.colourCode,
                    // }}
                >
                    <Link to="/company/profile" className="dropdown-item">
                        <img alt="profile icon" src={ProfileIcon} />
                        <span className="item-text">My Profile</span>
                    </Link>
                    <Link to="/company/company-selection" className="dropdown-item">
                        <img alt="exchange icon" src={ExchangeIcon} />
                        <span className="item-text">Select Company</span>
                    </Link>
                    <Link onClick={logout} to="#" className="dropdown-item">
                        <img alt="logout icon" src={LogoutIcon} />
                        <span className="item-text">Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeaderProfile;
