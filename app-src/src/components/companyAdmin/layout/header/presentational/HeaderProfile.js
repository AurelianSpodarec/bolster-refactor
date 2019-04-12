import React from 'react';
import { Link } from 'react-router-dom';

import NoProfilePic from '_content/images/layout/blank-profile.png';
import { FILE_STORAGE_URL } from 'config';

const HeaderProfile = ({
    profile,
    popupVisible,
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

        <div className={`options ${popupVisible ? 'visible' : ''}`}>
            <Link to="/company/tools/credit-logs" className="item">
                Credits Log <i className="icon fas fa-chevron-right" />
            </Link>

            <Link to="/company/tools/generation-queue" className="item">
                Generation Queue
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="/company/subscription" className="item">
                Manage Subscription
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="/company/invoices" className="item">
                My Invoices
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="/company/profile" className="item">
                My Profile
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="/company/settings" className="item">
                Company Settings
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
