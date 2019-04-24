import React from 'react';
import { connect } from 'react-redux';

import CompanyHeader from '../presentational/CompanyHeader';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

const CompanyHeaderContainer = ({
    profile,
    companySettings,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    isImpersonating
}) => (
    <CompanyHeader
        profile={profile}
        company={companySettings}
        unreadMessageCount={unreadMessageCount}
        totalCredits={totalCredits}
        totalRequests={totalRequests}
        isImpersonating={isImpersonating}
    />
);
const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings },
        messagesReducer: { messages },
        creditLogsReducer: { creditLogs },
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
    const totalCredits = Object.values(creditLogs).reduce(
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
        isImpersonating
    };
};
export default connect(mapStateToProps)(CompanyHeaderContainer);
