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
}) => (
    <>
        <Container className="frontend-header mobile">
            <div className="frontend-logo">
                <a href="/" onClick={e => handleClick(e, '/')}>
                    <img src={Logo} alt="Logo of Bolster Systems" />
                </a>
            </div>

            <i className="menu-button fa fa-bars" onClick={() => setMenuOpen(!menuOpen)} />
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
                {isSuperAdmin && (
                    <li>
                        <a href="/admin" onClick={e => handleClick(e, '/admin')}>
                            Super Admin
                        </a>
                    </li>
                )}

                {isCompanyAdmin && (
                    <li>
                        <a href="/company" onClick={e => handleClick(e, '/company')}>
                            Company Admin
                        </a>
                    </li>
                )}

                {isClientAccess && (
                    <li>
                        <a
                            href="/client/companies"
                            onClick={e => handleClick(e, '/client/companies')}
                        >
                            Client Access
                        </a>
                    </li>
                )}

                {isSuperAdmin || isCompanyAdmin || isClientAccess ? (
                    <li>
                        <a href="" onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                ) : (
                    <>
                        <li>
                            <a
                                href="/auth/login"
                                onClick={e => handleClick(e, '/auth/login')}
                                className={curRoute === '/auth/login' ? 'active' : ''}
                            >
                                Login
                            </a>
                        </li>
                        <li>
                            <a
                                href="/auth/register"
                                onClick={e => handleClick(e, '/auth/register')}
                                className={curRoute === '/auth/register' ? 'active' : ''}
                            >
                                Register
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    </>
);

export default FrontEndHeaderMobile;
