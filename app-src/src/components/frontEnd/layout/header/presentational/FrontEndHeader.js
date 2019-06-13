import React from 'react';
import { Link } from 'react-router-dom';

import appleStoreButton from '_content/images/frontend/buttons/apple-store.svg';
import googleButton from '_content/images/frontend/buttons/google-play-badge.png';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
const bolsterLogo =
    'https://app.bolstersystems.com/_Content/images/original/logo.png';

const FrontEndHeader = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    logout
}) => (
    <header className="frontend-header size-lg-12">
        <div className="container">
            <div className="top">
                <div className="left">
                    <div className="logo">
                        <Link to="/">
                            <img
                                alt="logo of Bolster Systems"
                                src={bolsterLogo}
                            />
                        </Link>
                    </div>
                    <div className="quote">
                        <h3>The complete surveying and management system</h3>
                    </div>
                </div>
                <div className="right">
                    <div className="links">
                        {' '}
                        {isSuperAdmin || isClientAccess || isCompanyAdmin ? (
                            <FrontEndButton type="button" handleClick={logout}>
                                Logout
                            </FrontEndButton>
                        ) : (
                            <>
                                <FrontEndButton
                                    classes="desktop-ver"
                                    to="/auth/Login"
                                >
                                    Login
                                </FrontEndButton>
                                <FrontEndButton
                                    classes="black desktop-ver"
                                    to="/auth/register"
                                >
                                    Register
                                </FrontEndButton>
                            </>
                        )}
                        {isCompanyAdmin && (
                            <FrontEndButton
                                to="/Company"
                                classes="black desktop-ver"
                            >
                                Dashboard
                            </FrontEndButton>
                        )}
                        {isSuperAdmin && (
                            <FrontEndButton to="/Admin" classes="black">
                                Dashboard
                            </FrontEndButton>
                        )}
                        {isClientAccess && (
                            <FrontEndButton
                                to="/Client/companies"
                                classes="black"
                            >
                                Client
                            </FrontEndButton>
                        )}
                        {isSuperAdmin || isClientAccess || isCompanyAdmin ? (
                            ''
                        ) : (
                            <>
                                <a
                                    className="app-btn"
                                    href="https://itunes.apple.com/gb/app/bolster-app/id1090118561?mt=8"
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        alt="available on the google play store"
                                        src={googleButton}
                                    />
                                </a>
                                <p className="phone-number">
                                    Tel:
                                    <a href="tel:01618737679"> 0161 873 7679</a>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default FrontEndHeader;
