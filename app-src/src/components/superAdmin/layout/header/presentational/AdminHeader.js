import React from 'react';
import { Link } from 'react-router-dom';
import bolsterLogo from '_content/images/bolster_logo.png';

const AdminHeader = () => (
    <header id="page-header" className="basic">
        <div className="container">
            <div className="logo">
                <Link to="/admin">
                    <img alt="bolster logo" src={bolsterLogo} />
                </Link>
            </div>

            <div className="clear" />
        </div>
    </header>
);

export default AdminHeader;
