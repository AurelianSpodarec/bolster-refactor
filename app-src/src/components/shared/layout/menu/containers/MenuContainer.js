import React from 'react';
import { connect } from 'react-redux';

import MenusWrapper from '../presentational/MenusWrapper';

const MenuContainer = ({ isSuperAdmin, isCompanyAdmin }) => (
    <MenusWrapper showTabs={isSuperAdmin && isCompanyAdmin} />
);

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: { jwtData }
    }
}) => ({
    isSuperAdmin: jwtData.isSuperAdmin,
    isCompanyAdmin: !!jwtData.companyID
});

export default connect(mapStateToProps)(MenuContainer);
