import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '_content/images/frontend-new/logo.png';
import GoogleAppStore from '_content/images/frontend-new/google-play-badge.png';
import AppleAppStore from '_content/images/frontend-new/apple-store.svg';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
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
    </>
);

export default FrontEndHeaderMobile;
