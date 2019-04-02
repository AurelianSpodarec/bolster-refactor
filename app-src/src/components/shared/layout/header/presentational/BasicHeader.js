import React from 'react';

import WhiteLogo from '_content/images/footer/logo-white.png';

const BasicHeader = () => (
    <header id="page-header" className="non-logged-in">
        <div className="container">
            <div className="logo">
                <img alt="logo of Bolster Systems" src={WhiteLogo} />
            </div>

            <div className="clear" />
        </div>
    </header>
);

export default BasicHeader;
