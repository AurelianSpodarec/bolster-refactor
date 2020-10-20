import React from 'react';
import { Link } from 'react-router-dom';
import { isIOS, isAndroid } from 'react-device-detect';

import AppStoreBadge from '_content/images/frontend-new/app-store-badge.png';
import GooglePlayBadge from '_content/images/frontend-new/google-play-badge.png';

import Container from 'components/frontEnd/shared/container/presentational/Container';
import FooterLogo from '_content/images/frontend-new/footer-logo.png';

const FrontEndFooter = ({ hideFooter, isMobile }) => {
    return (
        <Container className="frontend-footer">
            <div className="information">
                <p>Copyright Bolster Systems 2020. <br />All rights reserved</p>
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
                                    <a
                                        href="https://apps.apple.com/gb/app/bolster-systems/id1459750473"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img alt="Download on the App Store" src={AppStoreBadge} />
                                    </a>
                                )}
                                {isAndroid && (
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.bolster.dynamicdroid&hl=en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img alt="Get it on Google Play" src={GooglePlayBadge} />
                                    </a>
                                )}
                            </div>
                        )}
                        <p className="terms-text">
                            <Link to="/auth/terms">
                                Terms of Service
                            </Link>{' '}
                            <Link to="/auth/privacy-policy">
                                Privacy Policy
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </Container>
    );
};

export default FrontEndFooter;
