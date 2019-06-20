import React from 'react';
import { connect } from 'react-redux';

import MenusWrapper from '../presentational/MenusWrapper';

const MenuContainer = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    menuOpen
}) => {
    let totalAreas = 0;

    if (isSuperAdmin) totalAreas++;
    if (isCompanyAdmin) totalAreas++;
    if (isClientAccess) totalAreas++;

    return <MenusWrapper menuOpen={menuOpen} showTabs={totalAreas > 1} />;
};

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: { jwtData },
        mobileReducer: { menuOpen }
    }
}) => ({
    isSuperAdmin: jwtData.isSuperAdmin,
    isCompanyAdmin: !!jwtData.companyID,
    isClientAccess: jwtData.isClientAccess,
    menuOpen
});

export default connect(mapStateToProps)(MenuContainer);
