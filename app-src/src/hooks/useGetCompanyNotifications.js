import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';

import { selectMessages } from '../selectors/companyAdmin/messages';
import { selectTransferRequests } from '../selectors/companyAdmin/transferRequests';
import { selectRecentUpdates } from '../selectors/companyAdmin/recentUpdates';
import { selectPendingInvites } from '../selectors/companyAdmin/pendingInvites';

import { MESSAGE_TYPES } from '../constants/companyAdmin/enums';
import dismissSystemMessages from '../actions/companyAdmin/messageCentre/async/dismissSystemMessages';

const useGetCompanyNotifications = () => {
    const dispatch = useDispatch();
    // Company
    const messages = useSelector(selectMessages);
    const transferRequests = useSelector(selectTransferRequests) || {};
    const pendingInvites = useSelector(selectPendingInvites) || {};
    const recentUpdates = useSelector(selectRecentUpdates) || {};

    const unreadMessageCount = Object.values(messages).filter(
        ({ type, isRead }) => type === MESSAGE_TYPES.SYSTEM && !isRead,
    ).length;

    const notifications = Object.values(messages)
        .filter(({ type }) => type === MESSAGE_TYPES.NOTIFICATION)
        .sort((a, b) => moment(b.createdAt) - moment(a.createdAt));

    const totalRequests =
        Object.values(transferRequests).length + Object.values(pendingInvites).length;

    const unreadReleaseNoteCount = Object.values(recentUpdates).filter(
        ({ isRead }) => !isRead,
    ).length;

    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;

    const dismissNotifications = () => {
        dispatch(dismissSystemMessages());
    };

    return {
        unreadMessageCount,
        notifications,
        totalRequests,
        unreadReleaseNoteCount,
        unreadCount,
        dismissNotifications,
    };
};

export default useGetCompanyNotifications;
