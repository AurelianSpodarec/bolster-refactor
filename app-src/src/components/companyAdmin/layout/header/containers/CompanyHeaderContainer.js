import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompanyHeader from '../presentational/CompanyHeader';

import { getCompanyColour } from 'helpers/generic';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { toggleMobileMenu } from 'actions/shared/mobile/sync/toggleMobileMenu';

class CompanyHeaderContainer extends Component {
    render() {
        const { profile, companySettings, isImpersonating, shouldUsePayments, companyUserID } =
            this.props;
        const isCompanySelection = location.pathname.includes('company/company-selection');
        const companyColour = getCompanyColour(companySettings.companyColour);

        return (
            <CompanyHeader
                profile={profile}
                shouldUsePayments={shouldUsePayments}
                company={companySettings}
                companyColour={companyColour}
                isImpersonating={isImpersonating}
                isCompanySelection={isCompanySelection}
                companyUserID={companyUserID}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings },
    },
    shared: {
        profileReducer: { profile },
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, companyID, companyUserID },
        },
    },
}) => {
    const isImpersonating = headquartersCompanyID !== companyID;

    return {
        profile: profile,
        shouldUsePayments: profile.firstName,
        companySettings,
        isImpersonating,
        companyUserID,
    };
};

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    toggleMobileMenu: () => dispatch(toggleMobileMenu()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyHeaderContainer));
