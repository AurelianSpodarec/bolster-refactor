import React from 'react';
import { Link } from 'react-router-dom';

const bolsterLogo =
    'https://pbs.twimg.com/profile_images/720922614332592128/PMbyPQNk_400x400.jpg';

const AdminHeader = () => (
    <header id="page-header" style={{ borderColor: 'red' }}>
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
