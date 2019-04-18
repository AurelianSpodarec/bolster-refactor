import React from 'react';
import { connect } from 'react-redux';

import CompanyMenu from '../presentational/CompanyMenu';

const CompanyMenuContainer = ({ isFromHeadquarters }) => (
    <CompanyMenu isFromHeadquarters={isFromHeadquarters} />
);
const mapStateToProps = ({
    shared: {
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID }
        }
    }
}) => ({
    isFromHeadquarters: !!headquartersCompanyID
});

export default connect(mapStateToProps)(CompanyMenuContainer);
