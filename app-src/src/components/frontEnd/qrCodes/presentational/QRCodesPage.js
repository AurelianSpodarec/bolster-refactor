import React from 'react';

import ContentSection from 'components/frontEnd/shared/contentSection/presentational/ContentSection';

import TwoPhonesGoldImage from '_content/images/frontend/example-images/two-phones-gold.png';
import HeadingSecondary from 'components/frontEnd/shared/headings/presentational/HeadingSecondary';

import AppleStoreImage from '_content/images/frontend/buttons/apple-store.svg';
import GooglePlayImage from '_content/images/frontend/buttons/google-play-badge.png';

const AboutPage = () => (
    <div className="size-lg-12" id="about">
        <ContentSection classes="top-sec">
            <HeadingSecondary title="QR Code" />
            <div className="text">
                <p>
                    Please scan QR codes through the Bolster Systems app and ensure you have access and permissions to the correct drawings.
                    <br /><br />
                    Download the app for your device using one of the links below.
                </p>

                <div className="app-links">
                    <a href="https://apps.apple.com/gb/app/bolster-systems/id1459750473" target="_blank" rel="noopener noreferrer">
                        <img alt='Download on the App Store' src={AppleStoreImage} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.bolster.dynamicdroid&amp;hl=en" target="_blank" rel="noopener noreferrer">
                        <img alt='Get it on Google Play' src={GooglePlayImage} />
                    </a>
                </div>
            </div>
            <div className="image">
                <img
                    alt="Bolster App on phone devices"
                    src={TwoPhonesGoldImage}
                />
            </div>
        </ContentSection>
    </div>
);

export default AboutPage;
