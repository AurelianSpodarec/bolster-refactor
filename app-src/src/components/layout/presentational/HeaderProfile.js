import React from 'react';
import { Link } from 'react-router-dom';

import ProfilePic from '_content/images/examples/jamie.png';

const HeaderProfile = ({ profile, popupVisible, handleClick, updateNode }) => (
    <div className="profile" ref={updateNode}>
        <div className="user" onClick={handleClick}>
            <img alt="profile picture of" src={ProfilePic} />
            <div className="text">
                <p>{profile.fullName}</p>
                <span className="email">{profile.email}</span>
            </div>
            <i className="arrow fas fa-chevron-right" />
        </div>

        <div className={`options ${popupVisible ? 'visible' : ''}`}>
            <p className="item">Credits Available: ##5##</p>
            <Link to="#" className="item">
                Generation Queue: ##1##
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="#" className="item">
                Manage Subscription
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="#" className="item active">
                My Orders
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="#" className="item">
                My Profile
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="#" className="item">
                Company Settings
                <i className="icon fas fa-chevron-right" />
            </Link>
            <Link to="#" className="item">
                Logout
                <i className="icon fas fa-sign-out" />
            </Link>
        </div>
    </div>
);

export default HeaderProfile;
