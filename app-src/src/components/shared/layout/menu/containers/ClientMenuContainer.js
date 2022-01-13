import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import ClientMenu from '../presentational/ClientMenu';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import dismissMessages from 'actions/companyAdmin/messageCentre/async/dismissAlerts';

const ClientMenuContainer = () => {
    const dispatch = useDispatch();
    const { notifications, isCompanyAdmin } = useSelector(mapStateToProps);
    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;

    const dismissNotifications = () => {
        dispatch(dismissMessages(MESSAGE_TYPES.NOTIFICATION));
    };

    return (
        <ClientMenu
            unreadCount={unreadCount}
            dismissMessages={dismissNotifications}
            isCompany={isCompanyAdmin}
        />
    );
};

const mapStateToProps = ({
    client: {
        messagesCentreReducer: { messages },
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
