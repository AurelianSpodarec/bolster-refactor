import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FrontEndHeader from '../presentational/FrontEndHeader';
import { logout } from 'actions/shared/auth/sync/logout';

const FrontEndHeaderContainer = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    location,
    history,
    logout,
    hideHeader,
    isBannerScrolling,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <FrontEndHeader
            isSuperAdmin={isSuperAdmin}
            isCompanyAdmin={isCompanyAdmin}
            isClientAccess={isClientAccess}
            handleLogout={handleLogout}
            handleClick={handleClick}
            curRoute={location.pathname.toLowerCase()}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            hideHeader={hideHeader}
        />
    );

    function handleClick(e, path) {
        e.preventDefault();

        if (isBannerScrolling) return false;

        history.push(path);

        if (menuOpen) {
            setMenuOpen(false);
        }
    }

    function handleLogout(e) {
        e.preventDefault();

        if (isBannerScrolling) return false;

        logout();

        history.push('/');

        if (menuOpen) {
            setMenuOpen(false);
        }
    }
};

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: {
            jwtData: { isSuperAdmin, isClientAccess, isCompanyAdmin, companyID },
        },
    },
    frontEnd: {
        layoutReducer: {
            layout: { hideHeader },
        },
        bannersReducer: { isBannerScrolling },
    },
}) => ({
    isSuperAdmin,
    isCompanyAdmin: isCompanyAdmin || !!companyID,
    isClientAccess,
    hideHeader,
    isBannerScrolling,
});

const mapDispatchToProps = { logout };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FrontEndHeaderContainer));
