import React from 'react';
import { Link } from 'react-router-dom';

import AppStoreBadge from '_content/images/frontend-new/app-store-badge.png';
import GooglePlayBadge from '_content/images/frontend-new/google-play-badge.png';

import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FooterLogo from '_content/images/frontend-new/footer-logo.png';
import navItems from 'constants/frontEnd/navItems';

const FrontEndFooter = ({ hideFooter }) => (
    <Container className="frontend-footer">
        <div className="information">
            <p>Bolster is a registered trademark lore ipsum dolor sit amet Adipiscing sit amet</p>
        </div>
        <div className="internal-links">
            <div className="logo">
                <img src={FooterLogo} alt="Footer Logo" />
            </div>
            {!hideFooter && (
                <ul>
                    {navItems
                        .filter(({ name }) => name !== 'Home')
                        .map(({ name, slug }) => (
                            <li className={name === 'Register' ? 'hide-on-mobile' : ''} key={name}>
                                <Link to={slug}>{name}</Link>
                            </li>
                        ))}
                </ul>
            )}
        </div>
        <div className="external-links">
            {!hideFooter && (
                <>
                    <div className="register-button">
                        <FrontEndButton classes="gray" to="/register">
                            Register
                        </FrontEndButton>
                    </div>

                    <div className="app-buttons">
                        <a
                            href="https://apps.apple.com/gb/app/bolster-systems/id1459750473"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img alt="Download on the App Store" src={AppStoreBadge} />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.bolster.dynamicdroid&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img alt="Get it on Google Play" src={GooglePlayBadge} />
                        </a>
                    </div>
                </>
            )}
        </div>
    </Container>
);

export default FrontEndFooter;
