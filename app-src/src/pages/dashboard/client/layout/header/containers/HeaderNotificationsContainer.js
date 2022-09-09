import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNotifications from '../presentational/HeaderNotifications';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';
import dismissSystemMessages from 'actions/companyAdmin/messageCentre/async/dismissSystemMessages';
import moment from 'moment';

class HeaderNotificationsContainer extends Component {
    state = {
        popupVisible: false,
    };

    render() {
        const { notifications } = this.props;
        const unread = notifications.filter(({ isRead }) => !isRead);
        const unreadCount = unread.length;

        return (
            <HeaderNotifications
                {...this.state}
                notifications={unreadCount > 10 ? unread : notifications.slice(0, 10)}
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
            const { dismissSystemMessages } = this.props;
            dismissSystemMessages(MESSAGE_TYPES.NOTIFICATION);

            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible,
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
        messageCentreReducer: { systemMessages },
    },
}) => ({
    notifications: Object.values(systemMessages)
        .filter(({ type }) => type === MESSAGE_TYPES.NOTIFICATION)
        .sort((a, b) => moment(b.createdAt) - moment(a.createdAt)),
});

const mapDispatchToProps = dispatch => ({
    dismissSystemMessages: messageType => {
        dispatch(dismissSystemMessages(messageType));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNotificationsContainer);
