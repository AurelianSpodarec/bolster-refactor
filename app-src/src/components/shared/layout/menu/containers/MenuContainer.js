import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrevious } from '../../../../../helpers/hooks';

import { connect } from 'react-redux';

import MenusWrapper from '../presentational/MenusWrapper';

import { toggleMobileMenu } from '../../../../../actions/shared/mobile/sync/toggleMobileMenu';

const MenuContainer = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    menuOpen,
    toggleMobileMenu,
}) => {
    let totalAreas = 0;

    if (isSuperAdmin) totalAreas++;
    if (isCompanyAdmin) totalAreas++;
    if (isClientAccess) totalAreas++;

    const { pathname } = useLocation();
    const prevPath = usePrevious(pathname);

    useEffect(() => {
        if (prevPath !== pathname) {
            toggleMobileMenu();
        }
    }, [pathname, prevPath]);

    return <MenusWrapper menuOpen={menuOpen} showTabs={totalAreas > 1} />;
};

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: { jwtData },
        mobileReducer: { menuOpen },
    },
}) => ({
    isSuperAdmin: jwtData.isSuperAdmin,
    isCompanyAdmin: jwtData.isCompanyAdmin,
    isClientAccess: jwtData.isClientAccess,
    menuOpen,
});

const mapDispatchToProps = dispatch => ({
    toggleMobileMenu: () => dispatch(toggleMobileMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
