import React from 'react';
import { connect } from 'react-redux';

import ClientHeader from '../presentational/ClientHeader';

const ClientHeaderContainer = ({
    profile,
    companySettings,

    isImpersonating
}) => (
    <ClientHeader
        profile={profile}
        company={companySettings}
        isImpersonating={isImpersonating}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings }
    },
    shared: {
        profileReducer: { profile },
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, companyID }
        }
    }
}) => {
    const isImpersonating = headquartersCompanyID !== companyID;

    return {
        profile: profile,
        companySettings,
        isImpersonating
    };
};

export default connect(mapStateToProps)(ClientHeaderContainer);
