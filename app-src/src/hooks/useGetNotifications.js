import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';

import { selectMessages } from '../selectors/companyAdmin/messages';
import { selectTransferRequests } from '../selectors/companyAdmin/transferRequests';
import { selectRecentUpdates } from '../selectors/companyAdmin/recentUpdates';
import { selectPendingInvites } from '../selectors/companyAdmin/pendingInvites';

import { MESSAGE_TYPES } from '../constants/companyAdmin/enums';
import dismissMessages from '../actions/companyAdmin/messages/async/dismissMessages';
import { selectSuperAdminBuReports } from '../selectors/superAdmin/buReports';
import { selectSuperAdminContactSubmissions } from '../selectors/superAdmin/contactSubmissions';

const useGetNotifications = () => {
    const dispatch = useDispatch();

    // Super admin
    const superAdminBugReports = useSelector(selectSuperAdminBuReports) || {};
    const superAdminContactSubmissions = useSelector(selectSuperAdminContactSubmissions) || {};

    const unreadSuperAdminBugReports = Object.values(superAdminBugReports).reduce(
        (result, { isRead }) => result + (!isRead ? 1 : 0),
        0,
    );

    const unreadSuperAdminContactSubmissions = Object.values(superAdminContactSubmissions).reduce(
        (result, { contacted }) => result + (!contacted ? 1 : 0),
        0,
    );

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
        dispatch(dismissMessages(MESSAGE_TYPES.NOTIFICATION));
    };

    return {
        unreadMessageCount,
        notifications,
        totalRequests,
        unreadReleaseNoteCount,
        unreadCount,
        unreadSuperAdminBugReports,
        unreadSuperAdminContactSubmissions,
        dismissNotifications,
    };
};

export default useGetNotifications;
