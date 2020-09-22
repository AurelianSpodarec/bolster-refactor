import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '_content/images/frontend-new/logo.png';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import navItems from 'constants/frontEnd/navItems';

const FrontEndHeaderMobile = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    logout,
    curRoute,
}) => (
    <>
        <Container className="frontend-header mobile">
            <div className="frontend-logo">
                <Link to="/">
                    <img src={Logo} alt="Logo of Bolster Systems" />
                </Link>
            </div>

            <i className="menu-button fa fa-bars" />
        </Container>

        <div className="mobile-menu">
            <ul>
                {navItems
                    .filter(({ name }) => name !== 'Register')
                    .map(({ name, slug }) => (
                        <li key={name}>
                            <Link to={slug} className={curRoute === slug ? 'active' : ''}>
                                {name}
                            </Link>
                        </li>
                    ))}
                {isSuperAdmin && (
                    <li>
                        <Link to="/admin">Super Admin</Link>
                    </li>
                )}

                {isCompanyAdmin && (
                    <li>
                        <Link to="/company">Company Admin</Link>
                    </li>
                )}

                {isClientAccess && (
                    <li>
                        <Link to="/client/companies">Client Access</Link>
                    </li>
                )}

                {isSuperAdmin || isCompanyAdmin || isClientAccess ? (
                    <li>
                        <Link to="" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
            </ul>
        </div>
    </>
);

export default FrontEndHeaderMobile;
