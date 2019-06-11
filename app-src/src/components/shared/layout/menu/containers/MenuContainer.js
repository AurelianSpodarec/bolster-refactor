import React from 'react';
import { connect } from 'react-redux';

import MenusWrapper from '../presentational/MenusWrapper';

const MenuContainer = ({ isSuperAdmin, isCompanyAdmin, isClientAccess }) => {
    let totalAreas = 0;

    if (isSuperAdmin) totalAreas++;
    if (isCompanyAdmin) totalAreas++;
    if (isClientAccess) totalAreas++;

    return <MenusWrapper showTabs={totalAreas > 1} />;
};

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: { jwtData }
    }
}) => ({
    isSuperAdmin: jwtData.isSuperAdmin,
    isCompanyAdmin: !!jwtData.companyID,
    isClientAccess: jwtData.isClientAccess
});

export default connect(mapStateToProps)(MenuContainer);
