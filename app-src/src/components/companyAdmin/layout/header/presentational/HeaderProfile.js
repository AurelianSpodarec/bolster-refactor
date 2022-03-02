import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import ProfileIcon from '../../../../../_content/images/icons/profile.png';
import ExchangeIcon from '../../../../../_content/images/icons/exchange-in-user-profile.png';
import LogoutIcon from '../../../../../_content/images/icons/logout.png';

import useHeaderProfile from '../hooks/useHeaderProfile';
import useGetUserInitials from 'hooks/useGetUserInitials';

const HeaderProfile = () => {
    const { profile, backgroundColor, handleLogout } = useHeaderProfile();

    const initials = useGetUserInitials();

    return (
        <div className="profile-container">
            <div
                className="user"
                style={{
                    backgroundColor,
                }}
            >
                {profile.profileImageS3Key ? (
                    <img alt="profile" src={`${FILE_STORAGE_URL}/${profile.profileImageS3Key}`} />
                ) : (
                    <div className="initials flex-row justify-center align-center">
                        {initials ? initials : ''}
                    </div>
                )}
            </div>

            <div className="profile-menu">
                <div className="profile-options" style={{ backgroundColor }}>
                    <Link to="/company/profile" className="dropdown-item">
                        <img alt="profile icon" src={ProfileIcon} />
                        <span className="item-text">My Profile</span>
                    </Link>
                    <Link to="/company/company-selection" className="dropdown-item">
                        <img alt="exchange icon" src={ExchangeIcon} />
                        <span className="item-text">Select Company</span>
                    </Link>
                    <Link onClick={handleLogout} to="#" className="dropdown-item">
                        <img alt="logout icon" src={LogoutIcon} />
                        <span className="item-text">Logout</span>
                    </Link>
                </div>
            </div>

            <div
                className="bottom-hover-colour"
                style={{
                    backgroundColor,
                }}
            />
        </div>
    );
};

export default HeaderProfile;
