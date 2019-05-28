import React from 'react';
import { Link } from 'react-router-dom';

import appleStoreButton from '_content/images/frontend/buttons/apple-store.svg';
import googleButton from '_content/images/frontend/buttons/google-play-badge.png';
const bolsterLogo =
    'https://app.bolstersystems.com/_Content/images/original/logo.png';

const FrontEndHeader = () => (
    <header id="page-header" className="frontend-header size-lg-12">
        <div className="top">
            <div className="left">
                <div className="logo">
                    <Link to="/">
                        <img alt="logo of Bolster Systems" src={bolsterLogo} />
                    </Link>
                </div>
                <div className="quote">
                    <h3>The complete surveying and management system</h3>
                </div>
            </div>
            <div className="right">
                <div className="links">
                    {/* <a href="/auth/Login" className="button desktop-ver">
                        Client login
                    </a>
                    <a href="/Company/Register" className="button register desktop-ver">
                        Register
                    </a> */}

                    <a
                        className="app-btn"
                        href="https://itunes.apple.com/gb/app/bolster-app/id1090118561?mt=8"
                        target="_blank"
                    >
                        <img
                            alt="available on the apple store"
                            src={appleStoreButton}
                        />
                    </a>
                    <a
                        className="google-btn"
                        href="https://play.google.com/store/apps/details?id=com.bolster.app"
                        target="_blank"
                    >
                        <img
                            alt="available on the google play store"
                            src={googleButton}
                        />
                    </a>
                </div>

                <p className="phone-number">
                    Tel: <a href="tel:01618737679">0161 873 7679</a>
                </p>
            </div>
        </div>
    </header>
);

export default FrontEndHeader;
