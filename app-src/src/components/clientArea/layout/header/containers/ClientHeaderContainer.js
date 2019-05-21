import React from 'react';
import { connect } from 'react-redux';

import ClientHeader from '../presentational/ClientHeader';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { BUY_CREDITS } from 'constants/shared/modalTypes';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

const ClientHeaderContainer = ({
    profile,
    companySettings,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    isImpersonating,
    showModal
}) => (
    <ClientHeader
        profile={profile}
        company={companySettings}
        unreadMessageCount={unreadMessageCount}
        totalCredits={totalCredits}
        totalRequests={totalRequests}
        isImpersonating={isImpersonating}
        showModal={e => {
            e.preventDefault();
            showModal(BUY_CREDITS);
        }}
    />
);

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
        }
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
        costOfCredits
    };
};

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientHeaderContainer);
