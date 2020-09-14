import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '_content/images/frontend-new/logo.png';
import GoogleAppStore from '_content/images/frontend-new/google-play-badge.png';
import AppleAppStore from '_content/images/frontend-new/apple-store.svg';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const FrontEndHeader = ({ isSuperAdmin, isCompanyAdmin, isClientAccess, logout, hideHeader }) => (
    <Container className="frontend-header">
        <div className="frontend-header-left">
            <div className="frontend-logo">
                <img src={Logo} alt="Logo" />
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
            <div className="mobile-app-button-container">
                <img src={GoogleAppStore} alt="Google App Store" />
                <img src={AppleAppStore} alt="Apple App Store" />
            </div>
            <div className="logged-out-button-container">
                <FrontEndButton classes="gray spacing-right" to="/register">
                    Register
                </FrontEndButton>
                <FrontEndButton classes="red" to="/login">
                    Login
                </FrontEndButton>
            </div>
        </div>
    </Container>
);

export default FrontEndHeader;
