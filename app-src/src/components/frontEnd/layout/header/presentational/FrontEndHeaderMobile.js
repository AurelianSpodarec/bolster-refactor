import React from 'react';

import Logo from '_content/images/frontend-new/logo.png';
import navItems from 'constants/frontEnd/navItems';

import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const FrontEndHeaderMobile = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    handleClick,
    curRoute,
    menuOpen,
    setMenuOpen,
    hideNav,
    handleLogout,
    hideHeader,
    screenWidth,
}) => (
    <>
        <Container className="frontend-header mobile">
            <div className="frontend-header-mobile-wrapper">
                {!hideNav && (
                    <i className="menu-button fa fa-bars" onClick={() => setMenuOpen(!menuOpen)} />
                )}
                <div className="frontend-logo">
                    <a href="/" onClick={e => handleClick(e, '/')}>
                        <img src={Logo} alt="Bolster Systems" />
                    </a>
                </div>
                {!hideHeader && screenWidth >= 750 && (
                    <div className="">
                        {isSuperAdmin || isCompanyAdmin || isClientAccess ? (
                            <div className="logged-in-button-container">
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
                                {screenWidth >= 1024 && (
                                    <FrontEndButton
                                        to="/auth/register"
                                        classes={`gray spacing-right ${
                                            curRoute === '/auth/register' ? 'active' : ''
                                        }`}
                                        handleClick={e => handleClick(e, '/auth/register')}
                                    >
                                        Register
                                    </FrontEndButton>
                                )}
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
                        )}
                    </div>
                )}
            </div>
        </Container>

        <div className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
            <ul>
                {navItems
                    .filter(({ name }) => name !== 'Register')
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
    </>
);

export default FrontEndHeaderMobile;
