import React from 'react';
import { Link } from 'react-router-dom';

const HeaderProfile = ({ popupVisible, handleClick, updateNode }) => (
    <div className="item-container" ref={updateNode}>
        <div className="item main" onClick={handleClick}>
            <i className="far fa-bell fa-fw" />
        </div>

        <div className={`notification-list ${popupVisible ? 'visible' : ''}`}>
            <div className="item">
                <p>
                    ##CMFT / Build 1 / First Floor / Drawing PDF report is ready
                    to download
                </p>

                <Link to="#" className="button">
                    View
                </Link>
            </div>
            <div className="item">
                <p>
                    ##CMFT / Build 1 / First Floor / Drawing PDF report is ready
                    to download
                </p>

                <Link to="#" className="button">
                    View
                </Link>
            </div>
            <div className="item">
                <p>
                    ##CMFT / Build 1 / First Floor / Drawing PDF report is ready
                    to download
                </p>

                <Link to="#" className="button">
                    View
                </Link>
            </div>
            <div className="item">
                <Link to="#" className="button">
                    View all notifications
                </Link>
            </div>
        </div>
    </div>
);

export default HeaderProfile;
