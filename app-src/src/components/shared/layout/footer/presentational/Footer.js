import React from 'react';

import WhiteLogo from '_content/images/footer/logo-white.png';
import BlackLogo from '_content/images/footer/logo-black.png';

const logos = {
    white: WhiteLogo,
    black: BlackLogo
};

const Footer = ({ company }) => (
    <footer id="page-footer" style={{ backgroundColor: company.colourCode }}>
        <div className="container">
            <p style={{ color: company.colorSchemeText }}>
                Bolster Systems Ltd is a company registered in England and
                Wales. Company No: ##12345678##.
            </p>

            <img
                alt="logo of Bolster Systems"
                src={company ? logos[company.colorSchemeText] : WhiteLogo}
            />

            <div className="clear" />
        </div>
    </footer>
);

export default Footer;
