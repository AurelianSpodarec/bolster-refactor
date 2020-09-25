import React from 'react';

import TwoPhonesGoldImage from '_content/images/frontend/example-images/two-phones-gold.png';

import AppleStoreImage from '_content/images/frontend/buttons/apple-store.svg';
import GooglePlayImage from '_content/images/frontend/buttons/google-play-badge.png';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const AboutPage = () => (
    <>
        <Helmet title="QR Code" />
        <div className="qr-code-page-wrapper">
            <div className="qr-code-page content-page wysiwyg">
                <h2>QR Codes</h2>
                <div className="divider"></div>

                <p>
                    Please scan QR codes through the Bolster Systems app and ensure you have access
                    and permissions to the correct drawings.
                    <br />
                    <br />
                    Download the app for your device using one of the links below.
                </p>

                <div className="app-links-wrapper">
                    <a
                        href="https://apps.apple.com/gb/app/bolster-systems/id1459750473"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-links"
                    >
                        <img alt="Download on the App Store" src={AppleStoreImage} />
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.bolster.dynamicdroid&amp;hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-links"
                    >
                        <img alt="Get it on Google Play" src={GooglePlayImage} />
                    </a>
                </div>
            </div>
            <div className="image">
                <img alt="Bolster App on phone devices" src={TwoPhonesGoldImage} />
            </div>
        </div>
    </>
);

export default AboutPage;
