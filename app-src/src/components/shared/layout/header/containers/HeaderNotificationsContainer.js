import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNotifications from '../presentational/HeaderNotifications';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

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

export default connect(mapStateToProps)(HeaderNotificationsContainer);
