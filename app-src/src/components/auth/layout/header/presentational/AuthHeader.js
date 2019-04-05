import React from 'react';

import whiteLogo from '_content/images/footer/logo-white.png';

const AuthHeader = () => (
    <header id="page-header" className="non-logged-in">
        <div className="container">
            <div className="logo">
                <img alt="logo of Bolster Systems" src={whiteLogo} />
            </div>
            <div className="clear" />
        </div>
    </header>
);

export default AuthHeader;
