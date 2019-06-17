import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSelectedCompanyForClient, isEmpty } from 'helpers/generic';
import ClientHeader from '../presentational/ClientHeader';

class ClientHeaderContainer extends Component {
    render() {
        const { profile, isImpersonating, selectedCompany } = this.props;

        return (
            <ClientHeader
                profile={profile}
                company={selectedCompany}
                isImpersonating={isImpersonating}
                isCompanySelected={!isEmpty(selectedCompany)}
            />
        );
    }
}

const mapStateToProps = ({
    client: {
        companiesReducer: { companies }
    },
    shared: {
        profileReducer: { profile },
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, companyID }
        }
    }
}) => {
    const isImpersonating = headquartersCompanyID !== companyID;
    const selectedCompanyID = getSelectedCompanyForClient();

    return {
        profile: profile,
        selectedCompany: companies[selectedCompanyID] || {},
        isImpersonating
    };
};

export default connect(mapStateToProps)(ClientHeaderContainer);
