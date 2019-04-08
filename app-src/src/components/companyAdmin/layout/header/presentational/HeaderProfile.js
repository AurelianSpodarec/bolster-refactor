import React from 'react';
import { Link } from 'react-router-dom';

const HeaderProfile = ({
    profile,
    generationQueueLength,
    popupVisible,
    handleClick,
    logout,
    updateNode
}) => (
    <div className="profile" ref={updateNode}>
        <div className="user" onClick={handleClick}>
            <img alt="profile of" src={profile.profileImageS3Key} />
            <div className="text">
                <p>{profile.fullName}</p>
                <span className="email">{profile.email}</span>
            </div>
            <i className="arrow fas fa-chevron-right" />
        </div>

        <div className={`options ${popupVisible ? 'visible' : ''}`}>
            <p className="item">
                Credits Available: {profile.creditsAvailable}
            </p>
            <Link to="company/tools/generation-queue" className="item">
                Generation Queue: {generationQueueLength}
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="/company/subscription" className="item">
                Manage Subscription
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="/orders" className="item">
                My Orders
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="/profile" className="item">
                My Profile
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="/settings" className="item">
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
