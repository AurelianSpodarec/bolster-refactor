import React from 'react';
import { Link } from 'react-router-dom';

import NoProfilePic from '_content/images/layout/blank-profile.png';
import { FILE_STORAGE_URL } from 'config';

const HeaderProfile = ({
    profile,
    dropdownVisible,
    handleClick,
    logout,
    updateNode
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
                <span className="email">{profile.email}</span>
            </div>
            <i className="arrow fas fa-chevron-right" />
        </div>

        <div className={`options ${dropdownVisible ? 'visible' : ''}`}>
            {/* Check if reports needed for client area */}
            {/* <Link to="/company/tools/company-reports" className="item">
                Company Reports
                <i className="icon fas fa-chevron-right" />
            </Link> */}

            <Link to="/client/profile" className="item">
                My Profile
                <i className="icon fas fa-chevron-right" />
            </Link>

            <Link onClick={logout} to="#" className="item">
                Logout
                <i className="icon fas fa-sign-out" />
            </Link>
        </div>
    </div>
);

export default HeaderProfile;
