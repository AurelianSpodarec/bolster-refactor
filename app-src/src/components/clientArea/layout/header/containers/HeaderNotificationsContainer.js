import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNotifications from '../presentational/HeaderNotifications';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import dismissMessages from 'actions/companyAdmin/messages/async/dismissMessages';
import moment from 'moment';

class HeaderNotificationsContainer extends Component {
    state = {
        popupVisible: false
    };

    render() {
        const { notifications } = this.props;
        const unread = notifications.filter(({ isRead }) => !isRead);
        const unreadCount = unread.length;

        return (
            <HeaderNotifications
                {...this.state}
                notifications={
                    unreadCount > 10 ? unread : notifications.slice(0, 10)
                }
                unreadCount={unreadCount}
                togglePopup={this.togglePopup}
                updateNode={node => {
                    this.node = node;
                }}
            />
        );
    }

    togglePopup = () => {
        if (!this.state.popupVisible) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            const { dismissMessages } = this.props;
            dismissMessages(MESSAGE_TYPES.NOTIFICATION);

            document.removeEventListener(
                'click',
                this.handleOutsideClick,
                false
            );
        }

        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible
        }));
    };

    handleOutsideClick = e => {
        // ignore clicks on the component itself
        if (this.node && this.node.contains(e.target)) {
            return;
        }

        this.togglePopup();
    };
}

const mapStateToProps = ({
    companyAdmin: {
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
)(HeaderNotificationsContainer);
