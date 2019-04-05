import React from 'react';
import { Link } from 'react-router-dom';

import BlackLogo from '_content/images/footer/logo-black.png';

const AdminHeader = () => (
    <header id="page-header" style={{ borderColor: 'red' }}>
        <div className="container">
            <div className="logo">
                <Link to="/admin">
                    <img alt="bolster logo" src={BlackLogo} />
                </Link>
            </div>

            <div className="clear" />
        </div>
    </header>
);

export default AdminHeader;
