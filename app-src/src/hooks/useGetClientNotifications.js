import { useSelector } from 'react-redux';

import { selectClientMessages } from '../selectors/client/messages';
import { MESSAGE_TYPES } from '../constants/companyAdmin/enums';
import moment from 'moment';

const useGetClientNotifications = () => {
    const messages = useSelector(selectClientMessages);

    const notifications = Object.values(messages)
        .filter(({ type }) => type === MESSAGE_TYPES.NOTIFICATION)
        .sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;

    return { unreadCount, notifications };
};

export default useGetClientNotifications;
