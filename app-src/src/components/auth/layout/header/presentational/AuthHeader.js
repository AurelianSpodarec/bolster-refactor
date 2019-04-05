import React from 'react';

const bolsterLogo =
    'https://app.bolstersystems.com/_Content/images/original/logo.png';

const AuthHeader = () => (
    <header id="page-header" className="basic">
        <div className="container">
            <div className="logo">
                <img alt="logo of Bolster Systems" src={bolsterLogo} />
            </div>
            <div className="clear" />
        </div>
    </header>
);

export default AuthHeader;
