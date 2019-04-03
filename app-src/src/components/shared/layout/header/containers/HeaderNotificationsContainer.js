import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNotifications from '../presentational/HeaderNotifications';

class HeaderNotificationsContainer extends Component {
    state = {
        popupVisible: false
    };

    render() {
        const { state, props, togglePopup } = this;

        return (
            <HeaderNotifications
                updateNode={node => {
                    this.node = node;
                }}
                notifications={props.notifications}
                notificationsLength={props.notificationsLength}
                popupVisible={state.popupVisible}
                togglePopup={togglePopup}
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

const mapStateToProps = ({ companyAdmin: { notificationsReducer } }) => ({
    notifications: Object.values(notificationsReducer.notifications),
    notificationsLength: Object.values(notificationsReducer.notifications)
        .length
});

export default connect(mapStateToProps)(HeaderNotificationsContainer);
