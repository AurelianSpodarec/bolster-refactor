import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import CompanyMenu from '../presentational/CompanyMenu';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import dismissMessages from 'actions/companyAdmin/messages/async/dismissMessages';
import { isEmpty } from 'helpers/generic';

const CompanyMenuContainer = ({
    isFromHeadquarters,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    notifications,
    dismissMessages,
    subscriptions,
    subscriptions: { startOn, endOn },
    hasInitiallyFetched,
    isClientAccess
}) => {
    if (!hasInitiallyFetched) return null;

    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;
    const dismissNotifications = () => {
        dismissMessages(MESSAGE_TYPES.NOTIFICATION);
    };

    return (
        <CompanyMenu
            isSubscribed={_isSubscribed()}
            unreadMessageCount={unreadMessageCount}
            totalCredits={totalCredits}
            totalRequests={totalRequests}
            isFromHeadquarters={isFromHeadquarters}
            unreadCount={unreadCount}
            dismissMessages={dismissNotifications}
            openHelpScout={_openHelpScout}
            isClientAccess={isClientAccess}
        />
    );

    function _isSubscribed() {
        if (isEmpty(subscriptions)) return false;

        return (
            moment(startOn).isBefore(Date.now()) &&
            moment(endOn).isAfter(Date.now())
        );
    }

    function _openHelpScout(e) {

        e.preventDefault();
        window.Beacon('toggle');

      
        document.body.classList.add('helpscout-visible'); 
        window.Beacon('on', 'close', function(){
            document.body.classList.remove('helpscout-visible'); 
        });
    
     }
};
const mapStateToProps = ({
    companyAdmin: {
        messagesReducer: { messages },
        creditsReducer: { credits },
        transferRequestsReducer: { incomingTransferRequests },
        pendingInvitesReducer: { pendingInvites },
        subscriptionsReducer: { hasInitiallyFetched, subscriptions }
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, isClientAccess }
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
        hasInitiallyFetched,
        subscriptions,
        unreadMessageCount,
        totalCredits,
        totalRequests,
        isFromHeadquarters: !!headquartersCompanyID,
        notifications: Object.values(messages)
            .filter(({ type }) => type === MESSAGE_TYPES.NOTIFICATION)
            .sort((a, b) => moment(b.createdAt) - moment(a.createdAt)),
        isClientAccess
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
