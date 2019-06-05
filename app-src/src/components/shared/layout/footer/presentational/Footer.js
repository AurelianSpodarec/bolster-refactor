import React from 'react';

import WhiteLogo from '_content/images/footer/powered-by-bolster-white.svg';
import BlackLogo from '_content/images/footer/powered-by-bolster-black.svg';
import defaultStyles from 'constants/defaultStyles';

const logos = {
    white: WhiteLogo,
    black: BlackLogo
};

const Footer = ({ company }) => (
    <footer
        id="page-footer"
        style={{
            backgroundColor: company.colourCode || defaultStyles.colourCode
        }}
    >
        <div className="container">
            <p style={{ color: company.isBolsterLogoDark ? '#000' : '#fff' }}>
                Bolster Systems Ltd<sup>®</sup> is a company registered in
                England and Wales.
            </p>

            <img
                src={company.isBolsterLogoDark ? logos.black : logos.white}
                className="footer-logo"
                alt="powered by bolster systems logo"
            />

            <div className="clear" />
        </div>
    </footer>
);

export default Footer;
