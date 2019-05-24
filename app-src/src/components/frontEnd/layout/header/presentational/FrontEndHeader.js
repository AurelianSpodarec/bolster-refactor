import React from 'react';
import { Link } from 'react-router-dom';

const bolsterLogo =
    'https://app.bolstersystems.com/_Content/images/original/logo.png';

const FrontEndHeader = () => (
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

export default FrontEndHeader;
