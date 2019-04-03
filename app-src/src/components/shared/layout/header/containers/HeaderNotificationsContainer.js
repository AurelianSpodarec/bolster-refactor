import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNotifications from '../presentational/HeaderNotifications';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import dismissMessages from 'actions/companyAdmin/messages/async/dismissMessages';

class HeaderNotificationsContainer extends Component {
    state = {
        popupVisible: false
    };

    render() {
        const { notifications, unreadCount } = this.props;

        return (
            <HeaderNotifications
                {...this.state}
                notifications={notifications}
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
        if (this.node.contains(e.target)) {
            return;
        }

        this.togglePopup();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        messagesReducer: { messages }
    }
}) => {
    const notifications = Object.values(messages).filter(
        ({ type }) => type === MESSAGE_TYPES.NOTIFICATION
    );
    const unreadCount = notifications.filter(({ isRead }) => !isRead).length;

    return {
        notifications,
        unreadCount
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
)(HeaderNotificationsContainer);
