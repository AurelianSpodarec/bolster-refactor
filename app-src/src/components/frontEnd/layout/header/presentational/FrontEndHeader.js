import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '_content/images/frontend-new/logo.png';
import GoogleAppStore from '_content/images/frontend-new/google-play-badge.png';
import AppleAppStore from '_content/images/frontend-new/apple-store.svg';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const FrontEndHeader = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    onClick,
    logout,
    hideHeader,
}) => (
    <Container className="frontend-header">
        <div className="frontend-header-left">
            <div className="frontend-logo">
                <Link to="/">
                    <img src={Logo} alt="Logo of Bolster Systems" />
                </Link>
            </div>
            <div className="frontend-header-navlinks-container">
                <ul>
                    <li>
                        <Link to="">About us</Link>
                    </li>
                    <li>
                        <Link to="">Our System</Link>
                    </li>
                    <li>
                        <Link to="">How it works</Link>
                    </li>
                    <li>
                        <Link to="">Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="frontend-header-right">
            {isSuperAdmin || isCompanyAdmin || isClientAccess ? (
                <div className="logged-in-button-container">
                    {isSuperAdmin && (
                        <FrontEndButton to="admin" classes="gray spacing-right">
                            Super Admin
                        </FrontEndButton>
                    )}
                    {isCompanyAdmin && (
                        <FrontEndButton to="company" classes="gray spacing-right">
                            Company Admin
                        </FrontEndButton>
                    )}
                    {isClientAccess && (
                        <FrontEndButton to="client/companies" classes="gray spacing-right">
                            Client Access
                        </FrontEndButton>
                    )}
                    <FrontEndButton classes="red spacing-right" to="">
                        Logout
                    </FrontEndButton>
                </div>
            ) : (
                <div className="logged-out-button-container">
                    <div className="mobile-app-button-container">
                        <img src={GoogleAppStore} alt="Google App Store" />
                        <img src={AppleAppStore} alt="Apple App Store" />
                    </div>
                    <div>
                        <FrontEndButton to="register" classes="gray spacing-right">
                            Register
                        </FrontEndButton>
                        <FrontEndButton to="login" classes="red">
                            Login
                        </FrontEndButton>
                    </div>
                </div>
            )}
        </div>
    </Container>
);

export default FrontEndHeader;
