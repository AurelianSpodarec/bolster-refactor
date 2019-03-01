import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNotifications from '../presentational/HeaderNotifications';

class HeaderNotificationsContainer extends Component {
    state = {
        popupVisible: false
    };

    render() {
        const { state, props, handleClick } = this;

        return (
            <HeaderNotifications
                updateNode={node => {
                    this.node = node;
                }}
                notifications={props.notifications}
                notificationsLength={props.notificationsLength}
                popupVisible={state.popupVisible}
                handleClick={handleClick}
            />
        );
    }

    handleClick = () => {
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

        this.handleClick();
    };
}

const mapStateToProps = ({ notificationsReducers }) => ({
    notifications: notificationsReducers.notifications.notifications,
    notificationsLength: notificationsReducers.notifications.notificationsLength
});

export default connect(mapStateToProps)(HeaderNotificationsContainer);
