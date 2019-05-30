import React from 'react';

import WhiteLogo from '_content/images/frontend/footer-logo.png';

const FrontEndFooter = () => (
    <div id="footer-alt">
        <div className="container">
            <div className="logo">
                <span>powered by</span>

                <img
                    alt="logo of Bolster Systems"
                    src={WhiteLogo}
                    width="93"
                    height="40"
                />
            </div>
        </div>
    </div>
);

export default FrontEndFooter;
