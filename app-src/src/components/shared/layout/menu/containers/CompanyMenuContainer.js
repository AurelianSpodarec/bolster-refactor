import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import CompanyMenu from '../presentational/CompanyMenu';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import dismissMessages from 'actions/companyAdmin/messages/async/dismissMessages';
import { isEmpty } from 'helpers/generic';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { GENERATE_QR_CODES } from 'constants/shared/modalTypes';

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
    isClientAccess,
    showModal,
    users,
    companyUserID
}) => {
    if (!hasInitiallyFetched) return null;

    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;
    const dismissNotifications = () => {
        dismissMessages(MESSAGE_TYPES.NOTIFICATION);
    };
    const [shouldRestrictPayments, setShouldRestrictPayments] = useState(false);

    function usePrevious(value) {
        const ref = useRef(value);
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevUsers = usePrevious({ users });

    useEffect(() => {
        if (users && users[companyUserID] && !prevUsers[companyUserID]) {
            setShouldRestrictPayments(
                users[companyUserID].shouldRestrictPayments
            );
        }
    }, [users]);

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
            handleGenerateQRCodesModal={handleGenerateQRCodesModal}
            shouldRestrictPayments={shouldRestrictPayments}
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
        const helpscoutClass = 'helpscout-visible';
        e.preventDefault();

        if (document.body.classList.contains('helpscout-visible')) {
            document.body.classList.remove('helpscout-visible');
        } else {
            document.body.classList.add(helpscoutClass);
        }
        window.Beacon('toggle');
    }

    function handleGenerateQRCodesModal(e) {
        e.preventDefault();

        showModal(GENERATE_QR_CODES);
    }
};
const mapStateToProps = ({
    companyAdmin: {
        messagesReducer: { messages },
        creditsReducer: { credits },
        transferRequestsReducer: { incomingTransferRequests },
        pendingInvitesReducer: { pendingInvites },
        subscriptionsReducer: { hasInitiallyFetched, subscriptions },
        companyUsersReducer: { users }
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, isClientAccess, companyUserID }
        },
        profileReducer: { profile }
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
        isClientAccess,
        companyUserID,
        users
    };
};

const mapDispatchToProps = dispatch => ({
    dismissMessages: messageType => {
        dispatch(dismissMessages(messageType));
    },
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyMenuContainer);
