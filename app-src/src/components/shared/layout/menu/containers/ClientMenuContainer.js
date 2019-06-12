import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ClientMenu from '../presentational/ClientMenu';
import dismissMessages from 'actions/companyAdmin/messages/async/dismissMessages';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

const CompanyMenuContainer = ({ notifications, dismissMessages }) => {
    const unread = notifications.filter(({ isRead }) => !isRead);
    const unreadCount = unread.length;
    const dismissNotifications = () => {
        dismissMessages(MESSAGE_TYPES.NOTIFICATION);
    };

    return (
        <ClientMenu
            unreadCount={unreadCount}
            dismissMessages={dismissNotifications}
        />
    );
};

const mapStateToProps = ({
    client: {
        messagesReducer: { messages }
    }
}) => ({
    notifications: Object.values(messages)
        .filter(({ type }) => type === MESSAGE_TYPES.NOTIFICATION)
        .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
});

const mapDispatchToProps = dispatch => ({
    dismissMessages: messageType => {
        dispatch(dismissMessages(messageType));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyMenuContainer);
