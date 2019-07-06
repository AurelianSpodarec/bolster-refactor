import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompanyHeader from '../presentational/CompanyHeader';
import CompanyHeaderMobile from '../presentational/CompanyHeaderMobile';

import { getCompanyColour } from 'helpers/generic';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { toggleMobileMenu } from 'actions/shared/mobile/sync/toggleMobileMenu';

import { BUY_CREDITS } from 'constants/shared/modalTypes';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

class CompanyHeaderContainer extends Component {
    render() {
        const {
            profile,
            companySettings,
            unreadMessageCount,
            totalCredits,
            totalRequests,
            isImpersonating,
            showModal,
            onMobile,
            toggleMobileMenu
        } = this.props;

        const companyColour = getCompanyColour(companySettings.companyColour);

        return !onMobile ? (
            <CompanyHeader
                profile={profile}
                company={companySettings}
                companyColour={companyColour}
                unreadMessageCount={unreadMessageCount}
                totalCredits={totalCredits}
                totalRequests={totalRequests}
                isImpersonating={isImpersonating}
                showModal={e => {
                    e.preventDefault();
                    showModal(BUY_CREDITS);
                }}
            />
        ) : (
            <CompanyHeaderMobile
                profile={profile}
                company={companySettings}
                companyColour={companyColour}
                unreadMessageCount={unreadMessageCount}
                totalCredits={totalCredits}
                totalRequests={totalRequests}
                isImpersonating={isImpersonating}
                showModal={e => {
                    e.preventDefault();
                    showModal(BUY_CREDITS);
                }}
                toggleMobileMenu={toggleMobileMenu}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings },
        messagesReducer: { messages },
        creditsReducer: { credits, isFetching, costOfCredits },
        transferRequestsReducer: { incomingTransferRequests },
        pendingInvitesReducer: { pendingInvites }
    },
    shared: {
        profileReducer: { profile },
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, companyID }
        },
        mobileReducer: { onMobile }
    }
}) => {
    const isImpersonating = headquartersCompanyID !== companyID;

    const unreadMessageCount = Object.values(messages).filter(
        ({ type, isRead }) => type === MESSAGE_TYPES.SYSTEM && !isRead
    ).length;
    const totalCredits = Object.values(credits).reduce(
        (a, b) => a + b.quantity,
        0
    );
    const totalRequests =
        Object.values(incomingTransferRequests).length +
        Object.values(pendingInvites).length;

    return {
        profile: profile,
        companySettings,
        unreadMessageCount,
        totalCredits,
        totalRequests,
        isImpersonating,
        isFetching,
        costOfCredits,
        onMobile
    };
};

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    toggleMobileMenu: () => dispatch(toggleMobileMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyHeaderContainer);
