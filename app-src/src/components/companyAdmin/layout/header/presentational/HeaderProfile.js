import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import ProfileIcon from '../../../../../_content/images/icons/profile.png';
import ProfileIconDark from '../../../../../_content/images/icons/profile-dark.png';
import ExchangeIcon from '../../../../../_content/images/icons/exchange-in-user-profile.png';
import ExchangeIconDark from '../../../../../_content/images/icons/exchange-in-user-profile-dark.png';
import LogoutIcon from '../../../../../_content/images/icons/logout.png';
import LogoutIconDark from '../../../../../_content/images/icons/logout-dark.png';

import { selectIsBolsterLogoDark } from 'selectors/companyAdmin/companySettings';

import useHeaderProfile from '../hooks/useHeaderProfile';
import useGetUserInitials from 'hooks/useGetUserInitials';
import defaultStyles from 'constants/defaultStyles';
import superAdminIcon from '../../../../../_content/images/icons/super-admin.png';

const HeaderProfile = ({ isAdmin, isClient }) => {
    const { profile, backgroundColor, handleLogout } = useHeaderProfile(isAdmin);

    const initials = useGetUserInitials()?.toUpperCase();
    const isDarkLogoEnabled = useSelector(selectIsBolsterLogoDark);

    return (
        <div className="profile-container">
            <div
                className="user"
                style={
                    isAdmin
                        ? { backgroundColor: defaultStyles.colourCode }
                        : { backgroundColor: backgroundColor }
                }
            >
                {isAdmin ? (
                    <img alt="profile" src={superAdminIcon} />
                ) : profile.profileImageS3Key ? (
                    <img alt="profile" src={`${FILE_STORAGE_URL}/${profile.profileImageS3Key}`} />
                ) : (
                    <div className="initials flex-row justify-center align-center">
                        {initials ? initials : ''}
                    </div>
                )}
            </div>

            <div className="profile-menu">
                <div
                    className={`profile-options ${isDarkLogoEnabled ? 'dark' : ''}`}
                    style={
                        isAdmin
                            ? { backgroundColor: defaultStyles.colourCode }
                            : { backgroundColor: backgroundColor }
                    }
                >
                    {!isAdmin && (
                        <>
                            <Link
                                to={isClient ? '/client/profile' : '/company/profile'}
                                className="dropdown-item"
                            >
                                <img
                                    alt="profile icon"
                                    src={isDarkLogoEnabled ? ProfileIconDark : ProfileIcon}
                                />
                                <span className="item-text">My Profile</span>
                                <div className="dark-hover"></div>
                            </Link>
                            <Link to="/company/company-selection" className="dropdown-item">
                                <img
                                    alt="exchange icon"
                                    src={isDarkLogoEnabled ? ExchangeIconDark : ExchangeIcon}
                                />
                                <span className="item-text">Select Company</span>
                                <div className="dark-hover"></div>
                            </Link>
                        </>
                    )}
                    <Link onClick={handleLogout} to="#" className="dropdown-item">
                        <img
                            alt="logout icon"
                            src={isDarkLogoEnabled ? LogoutIconDark : LogoutIcon}
                        />
                        <span className="item-text">Logout</span>
                        <div className="dark-hover"></div>
                    </Link>
                </div>
            </div>

            <div
                className="bottom-hover-colour"
                style={
                    isAdmin
                        ? { backgroundColor: defaultStyles.colourCode }
                        : { backgroundColor: backgroundColor }
                }
            />
        </div>
    );
};

export default HeaderProfile;
