import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyColour } from 'helpers/generic';
import ClientHeader from '../presentational/ClientHeader';

class ClientHeaderContainer extends Component {
    render() {
        const { profile, companySettings, isImpersonating } = this.props;
        const companyColour = getCompanyColour(companySettings.companyColour);

        return (
            <ClientHeader
                profile={profile}
                company={companySettings}
                isImpersonating={isImpersonating}
                companyColour={companyColour}
            />
        );
    }
}

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
