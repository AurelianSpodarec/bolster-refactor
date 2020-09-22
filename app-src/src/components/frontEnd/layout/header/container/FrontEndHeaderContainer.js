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
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <FrontEndHeader
            isSuperAdmin={isSuperAdmin}
            isCompanyAdmin={isCompanyAdmin}
            isClientAccess={isClientAccess}
            logout={handleLogout}
            onClick={handleClick}
            curRoute={location.pathname.toLowerCase()}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
        />
    );

    function handleClick(path) {
        history.push(path);
    }

    function handleLogout() {
        logout();
        history.push('/');
    }
};

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: {
            jwtData: { isSuperAdmin, isClientAccess, companyID },
        },
    },
}) => ({
    isSuperAdmin,
    isCompanyAdmin: !!companyID,
    isClientAccess,
});

const mapDispatchToProps = { logout };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FrontEndHeaderContainer));
