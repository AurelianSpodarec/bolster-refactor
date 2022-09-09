import React from 'react';
import { Link } from 'react-router-dom';
import { isIOS, isAndroid } from 'react-device-detect';

import { ANDROID_APP_URL, IOS_APP_URL } from 'config';

import AppStoreBadge from 'assets/images/frontend-new/app-store-badge.png';
import GooglePlayBadge from 'assets/images/frontend-new/google-play-badge.png';

import Container from 'pages/public/shared/container/presentational/Container';
import FooterLogo from 'assets/images/frontend-new/footer-logo.png';

const FrontEndFooter = ({ hideFooter, isMobile, cookieConsent }) => {
    return (
        <Container className={`frontend-footer ${!cookieConsent ? 'cookie-visible' : ''}`}>
            <div className="information">
                <p>
                    Copyright Bolster Systems 2020. <br />
                    All rights reserved
                </p>
            </div>
            <div className="internal-links">
                <div className="logo">
                    <img src={FooterLogo} alt="Powered by bolstersystems.com" />
                </div>
            </div>
            <div className="external-links">
                {!hideFooter && (
                    <>
                        {isMobile && (
                            <div className="app-buttons">
                                {isIOS && (
                                    <a href={IOS_APP_URL} target="_blank" rel="noopener noreferrer">
                                        <img alt="Download on the App Store" src={AppStoreBadge} />
                                    </a>
                                )}
                                {isAndroid && (
                                    <a
                                        href={ANDROID_APP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img alt="Get it on Google Play" src={GooglePlayBadge} />
                                    </a>
                                )}
                            </div>
                        )}
                        <p className="terms-text">
                            <Link to="/auth/terms">Terms of Service</Link>
                        </p>
                    </>
                )}
            </div>
        </Container>
    );
};

export default FrontEndFooter;
