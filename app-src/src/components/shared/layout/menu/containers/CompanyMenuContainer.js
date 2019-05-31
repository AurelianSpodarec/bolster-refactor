import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import CompanyMenu from '../presentational/CompanyMenu';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import dismissMessages from 'actions/companyAdmin/messages/async/dismissMessages';

const CompanyMenuContainer = ({
    isFromHeadquarters,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    notifications,
    dismissMessages
}) => {
    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;
    const dismissNotifications = () => {
        dismissMessages(MESSAGE_TYPES.NOTIFICATION);
    };

    return (
        <CompanyMenu
            unreadMessageCount={unreadMessageCount}
            totalCredits={totalCredits}
            totalRequests={totalRequests}
            isFromHeadquarters={isFromHeadquarters}
            unreadCount={unreadCount}
            dismissMessages={dismissMessages}
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

const mapDispatchToProps = dispatch => ({
    dismissMessages: messageType => {
        dispatch(dismissMessages(messageType));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyMenuContainer);
