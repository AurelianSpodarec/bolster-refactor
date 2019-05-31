import React from 'react';
import { connect } from 'react-redux';

import CompanyMenu from '../presentational/CompanyMenu';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

const CompanyMenuContainer = ({
    isFromHeadquarters,
    unreadMessageCount,
    totalCredits,
    totalRequests
}) => (
    <CompanyMenu
        unreadMessageCount={unreadMessageCount}
        totalCredits={totalCredits}
        totalRequests={totalRequests}
        isFromHeadquarters={isFromHeadquarters}
    />
);
const mapStateToProps = ({
    companyAdmin: {
        messagesReducer: { messages },
        creditsReducer: { credits },
        transferRequestsReducer: { incomingTransferRequests },
        pendingInvitesReducer: { pendingInvites }
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID }
        }
    }
}) => {
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
        unreadMessageCount,
        totalCredits,
        totalRequests,
        isFromHeadquarters: !!headquartersCompanyID
    };
};

export default connect(mapStateToProps)(CompanyMenuContainer);
