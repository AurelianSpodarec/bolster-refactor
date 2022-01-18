import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';

import CompanyMenu from '../presentational/CompanyMenu';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { GENERATE_QR_CODES } from 'constants/shared/modalTypes';
import { selectTotalMessagesCount } from 'selectors/companyAdmin/messageCentre';
import markSystemMessagesAsRead from 'actions/companyAdmin/messageCentre/async/markSystemMessagesAsRead';

const CompanyMenuContainer = ({
    isFromHeadquarters,
    totalCredits,
    totalRequests,
    notifications,
    markSystemMessagesAsRead,
    subscriptions,
    subscriptions: { startOn },
    hasInitiallyFetched,
    isClientAccess,
    showModal,
    users,
    companyUserID,
    unreadReleaseNoteCount,
}) => {
    if (!hasInitiallyFetched) return null;

    const isCompanySelection = location.pathname.includes('company/company-selection');

    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;
    const unreadMessageCount = useSelector(selectTotalMessagesCount);

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
            setShouldRestrictPayments(users[companyUserID].shouldRestrictPayments);
        }
    }, [users]);
    const isCompanyUser = !!companyUserID;
    return (
        <CompanyMenu
            isSubscribed={_isSubscribed()}
            unreadMessageCount={unreadMessageCount}
            totalCredits={totalCredits}
            totalRequests={totalRequests}
            isFromHeadquarters={isFromHeadquarters}
            unreadCount={unreadCount}
            markSystemMessagesAsRead={markSystemMessagesAsRead}
            openHelpScout={_openHelpScout}
            isClientAccess={isClientAccess}
            handleGenerateQRCodesModal={handleGenerateQRCodesModal}
            shouldRestrictPayments={shouldRestrictPayments}
            unreadReleaseNoteCount={unreadReleaseNoteCount}
            isCompanySelection={isCompanySelection}
            isCompanyUser={isCompanyUser}
        />
    );

    function _isSubscribed() {
        if (isEmpty(subscriptions)) return false;

        return !!startOn;
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
        messageCentreReducer: { systemMessages },
        creditsReducer: { credits },
        transferRequestsReducer: { incomingTransferRequests },
        pendingInvitesReducer: { pendingInvites },
        subscriptionsReducer: { hasInitiallyFetched, subscriptions },
        companyUsersReducer: { users },
        recentUpdatesReducer: { updates },
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, isClientAccess, companyUserID },
        },
    },
}) => {
    const totalCredits = Object.values(credits).reduce((a, b) => a + b.quantity, 0);
    const totalRequests =
        Object.values(incomingTransferRequests).length + Object.values(pendingInvites).length;

    const unreadReleaseNoteCount = Object.values(updates).filter(({ isRead }) => !isRead).length;

    return {
        hasInitiallyFetched,
        subscriptions,
        totalCredits,
        totalRequests,
        isFromHeadquarters: !!headquartersCompanyID,
        notifications: Object.values(systemMessages)
            .filter(({ type }) => type === MESSAGE_TYPES.NOTIFICATION)
            .sort((a, b) => moment(b.createdAt) - moment(a.createdAt)),
        isClientAccess,
        companyUserID,
        users,
        unreadReleaseNoteCount,
    };
};

const mapDispatchToProps = dispatch => ({
    markSystemMessagesAsRead: () => dispatch(markSystemMessagesAsRead()),
    showModal: (type, props) => dispatch(showModal(type, props)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyMenuContainer));
