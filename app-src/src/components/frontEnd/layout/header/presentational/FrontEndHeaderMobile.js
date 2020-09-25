import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '_content/images/frontend-new/logo.png';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import navItems from 'constants/frontEnd/navItems';

const FrontEndHeaderMobile = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    handleClick,
    handleLogout,
    curRoute,
    menuOpen,
    setMenuOpen,
    hideNav,
}) => (
    <>
        <Container className="frontend-header mobile">
            <div className="frontend-logo">
                <a href="/" onClick={e => handleClick(e, '/')}>
                    <img src={Logo} alt="Logo of Bolster Systems" />
                </a>
            </div>
            {!hideNav && (
                <i className="menu-button fa fa-bars" onClick={() => setMenuOpen(!menuOpen)} />
            )}
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
