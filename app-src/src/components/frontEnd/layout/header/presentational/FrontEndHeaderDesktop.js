import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '_content/images/frontend-new/logo.png';
import GoogleAppStore from '_content/images/frontend-new/google-play-badge.png';
import AppleAppStore from '_content/images/frontend-new/apple-store.svg';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import navItems from 'constants/frontEnd/navItems';

const FrontEndHeaderDesktop = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    handleClick,
    handleLogout,
    curRoute,
    hideHeader,
}) => (
    <Container className="frontend-header">
        <div className="frontend-header-left">
            <div className="frontend-logo">
                <a href="/" onClick={e => handleClick(e, '/')}>
                    <img src={Logo} alt="Logo of Bolster Systems" />
                </a>
            </div>
            {!hideHeader && (
                <div className="frontend-header-navlinks-container">
                    <ul>
                        {navItems
                            .filter(({ name }) => {
                                if (name === 'Home' || name === 'Register') return false;
                                return true;
                            })
                            .map(({ name, slug }) => (
                                <li key={name}>
                                    <a
                                        href={slug}
                                        className={curRoute === slug ? 'active' : ''}
                                        onClick={e => handleClick(e, slug)}
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
        {!hideHeader && (
            <div className="frontend-header-right">
                {isSuperAdmin || isCompanyAdmin || isClientAccess ? (
                    <div className="logged-in-button-container">
                        {isSuperAdmin && (
                            <FrontEndButton
                                to="/admin"
                                classes="gray spacing-right"
                                handleClick={e => handleClick(e, '/admin')}
                            >
                                Super Admin
                            </FrontEndButton>
                        )}
                        {isCompanyAdmin && (
                            <FrontEndButton
                                to="/company"
                                classes="gray spacing-right"
                                handleClick={e => handleClick(e, '/company')}
                            >
                                Company Admin
                            </FrontEndButton>
                        )}
                        {isClientAccess && (
                            <FrontEndButton
                                to="/client/companies"
                                classes="gray spacing-right"
                                handleClick={e => handleClick(e, '/client/companies')}
                            >
                                Client Access
                            </FrontEndButton>
                        )}
                        <FrontEndButton
                            type="button"
                            classes="red spacing-right"
                            handleClick={handleLogout}
                        >
                            Logout
                        </FrontEndButton>
                    </div>
                ) : (
                    <div className="logged-out-button-container">
                        <div className="mobile-app-button-container">
                            <a
                                href="https://apps.apple.com/gb/app/bolster-systems/id1459750473"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={AppleAppStore} alt="Apple App Store" />
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.bolster.dynamicdroid&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={GoogleAppStore} alt="Google App Store" />
                            </a>
                        </div>
                        <div>
                            <FrontEndButton
                                to="/auth/register"
                                classes={`gray spacing-right ${
                                    curRoute === '/auth/register' ? 'active' : ''
                                }`}
                                handleClick={e => handleClick(e, '/auth/register')}
                            >
                                Register
                            </FrontEndButton>
                            <FrontEndButton
                                to="/auth/login"
                                classes={`red spacing-right ${
                                    curRoute === '/auth/login' ? 'active' : ''
                                }`}
                                handleClick={e => handleClick(e, '/auth/login')}
                            >
                                Login
                            </FrontEndButton>
                        </div>
                    </div>
                )}
            </div>
        )}
    </Container>
);

export default FrontEndHeaderDesktop;
