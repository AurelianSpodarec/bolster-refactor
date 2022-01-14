import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import ClientMenu from '../presentational/ClientMenu';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import dismissSystemMessages from 'actions/companyAdmin/messageCentre/async/dismissSystemMessages';

const ClientMenuContainer = () => {
    const dispatch = useDispatch();
    const { notifications, isCompanyAdmin } = useSelector(mapStateToProps);
    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;

    const dismissNotifications = () => {
        dispatch(dismissSystemMessages(MESSAGE_TYPES.NOTIFICATION));
    };

    return (
        <ClientMenu
            unreadCount={unreadCount}
            dismissSystemMessages={dismissNotifications}
            isCompany={isCompanyAdmin}
        />
    );
};

const mapStateToProps = ({
    client: {
        messageCentreReducer: { messages },
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { isCompanyAdmin },
        },
    },
}) => ({
    notifications: Object.values(messages)
        .filter(({ type }) => type === MESSAGE_TYPES.NOTIFICATION)
        .sort((a, b) => moment(b.createdAt) - moment(a.createdAt)),
    isCompanyAdmin: isCompanyAdmin,
});

export default ClientMenuContainer;
