import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import CompanyMenu from '../presentational/CompanyMenu';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

const CompanyMenuContainer = ({
    isFromHeadquarters,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    notifications
}) => {
    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;
    return (
        <CompanyMenu
            unreadMessageCount={unreadMessageCount}
            totalCredits={totalCredits}
            totalRequests={totalRequests}
            isFromHeadquarters={isFromHeadquarters}
            unreadCount={unreadCount}
        />
    );
};
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
        isFromHeadquarters: !!headquartersCompanyID,
        notifications: Object.values(messages)
            .filter(({ type }) => type === MESSAGE_TYPES.NOTIFICATION)
            .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
    };
};

export default connect(mapStateToProps)(CompanyMenuContainer);
