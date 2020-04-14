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
    state = {
        shouldRestrictPayments: false
    };
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
            toggleMobileMenu,
            shouldUsePayments
        } = this.props;

        const companyColour = getCompanyColour(companySettings.companyColour);

        return !onMobile ? (
            <CompanyHeader
                profile={profile}
                shouldUsePayments={shouldUsePayments}
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
                shouldRestrictPayments={this.state.shouldRestrictPayments}
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
    componentDidMount = () => {
        const { users, companyUserID } = this.props;

        if (users && users[companyUserID]) {
            this.setState({
                shouldRestrictPayments:
                    users[companyUserID].shouldRestrictPayments
            });
        }
    };
    componentDidUpdate = prevProps => {
        const { users, companyUserID } = this.props;

        if (users && users[companyUserID] && !prevProps.users[companyUserID]) {
            this.setState({
                shouldRestrictPayments:
                    users[companyUserID].shouldRestrictPayments
            });
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings },
        messagesReducer: { messages },
        creditsReducer: { credits, isFetching, costOfCredits },
        transferRequestsReducer: { incomingTransferRequests },
        pendingInvitesReducer: { pendingInvites },
        companyUsersReducer: { users }
    },
    shared: {
        profileReducer: { profile },
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, companyID, companyUserID }
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
        shouldUsePayments: profile.firstName,
        companySettings,
        unreadMessageCount,
        totalCredits,
        totalRequests,
        isImpersonating,
        isFetching,
        costOfCredits,
        onMobile,
        companyUserID,
        users
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
