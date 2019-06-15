import React from 'react';

import WhiteLogo from '_content/images/footer/logo-footer-white.png';

const FrontEndFooter = () => (
    <div id="footer-alt">
        <div className="container">
            <div className="logo">
                <img
                    alt="logo of Bolster Systems"
                    src={WhiteLogo}
                    width="107"
                    height="51"
                />
            </div>
        </div>
    </div>
);

export default FrontEndFooter;
