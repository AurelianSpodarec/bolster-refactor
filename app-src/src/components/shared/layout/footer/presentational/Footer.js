import React from 'react';

import WhiteLogo from '_content/images/footer/logo-white.png';
import BlackLogo from '_content/images/footer/logo-black.png';
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
                Bolster Systems Ltd is a company registered in England and
                Wales.
            </p>

            <img
                alt="logo of Bolster Systems"
                src={company.isBolsterLogoDark ? logos.black : logos.white}
            />

            <div className="clear" />
        </div>
    </footer>
);

export default Footer;
