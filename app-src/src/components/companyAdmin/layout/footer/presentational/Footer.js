import React from 'react';

import WhiteLogo from '_content/images/footer/logo-footer-white.png';
import BlackLogo from '_content/images/footer/logo-footer-black.png';
import AppVersionMessage from './AppVersionMessage';

const logos = {
    white: WhiteLogo,
    black: BlackLogo,
};

const Footer = ({ company, companyColour, version, isFetching, error, companyUserID }) => (
    <footer
        id="page-footer"
        style={{
            backgroundColor: companyColour,
        }}
    >
        <div className="container">
            <p style={{ color: !company.isBolsterLogoDark || !companyUserID ? '#fff' : '#000' }}>
                <AppVersionMessage version={version} isFetching={isFetching} error={error} />
            </p>

            <img
                src={!company.isBolsterLogoDark || !companyUserID ? logos.white : logos.black}
                className="footer-logo"
                alt="powered by bolster systems logo"
            />

            <div className="clear" />
        </div>
    </footer>
);

export default Footer;
