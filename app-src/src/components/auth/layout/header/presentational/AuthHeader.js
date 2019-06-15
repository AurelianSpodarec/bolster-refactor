import React from 'react';
import { Link } from 'react-router-dom';
const bolsterLogo = '_content/images/bolster_logo.png';

const AuthHeader = () => (
    <header id="page-header" className="basic">
        <div className="container">
            <div className="logo">
                <Link to="/">
                    <img alt="logo of Bolster Systems" src={bolsterLogo} />
                </Link>
            </div>
            <div className="clear" />
        </div>
    </header>
);

export default AuthHeader;
