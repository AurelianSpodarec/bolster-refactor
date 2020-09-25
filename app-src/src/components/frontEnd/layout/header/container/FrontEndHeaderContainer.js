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

        history.push(path);

        if (menuOpen) {
            setMenuOpen(false);
        }
    }

    function handleLogout(e) {
        e.preventDefault();

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
            jwtData: { isSuperAdmin, isClientAccess, companyID },
        },
    },
    frontEnd: {
        layoutReducer: {
            layout: { hideHeader },
        },
    },
}) => ({
    isSuperAdmin,
    isCompanyAdmin: !!companyID,
    isClientAccess,
    hideHeader,
});

const mapDispatchToProps = { logout };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FrontEndHeaderContainer));
