import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GENERATION_STATE_VAL } from 'constants/companyAdmin/enums';
import moment from 'moment';

import HeaderProfile from '../presentational/HeaderProfile';
import { logout } from 'actions/shared/auth/sync/logout';
import { isEmpty } from 'helpers/generic';

class HeaderProfileContainer extends Component {
    state = {
        popupVisible: false,
        renderMobile: false
    };

    render() {
        const {
            isImpersonating,
            companyName,
            profile,
            companyReportsLength
        } = this.props;
        return (
            <HeaderProfile
                updateNode={node => {
                    this.node = node;
                }}
                logout={this.logout}
                profile={profile}
                companyReportsLength={companyReportsLength}
                popupVisible={this.state.popupVisible}
                handleClick={this.handleClick}
                isImpersonating={isImpersonating}
                companyName={companyName}
                isSubscribed={this._isSubscribed()}
                renderMobile={this.state.renderMobile}
            />
        );
    }

    _isSubscribed = () => {
        const {
            subscriptions,
            subscriptions: { startOn, endOn }
        } = this.props;
        if (isEmpty(subscriptions)) return false;

        return (
            moment(startOn).isBefore(Date.now()) &&
            moment(endOn).isAfter(Date.now())
        );
    };

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
        if (this.node && this.node.contains(e.target)) {
            return;
        }

        this.handleClick();
    };

    logout = e => {
        this.handleClick();
        const { history, logout } = this.props;
        e.preventDefault();
        logout();
        history.replace('/auth/login');
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { name }
        },
        subscriptionsReducer: { subscriptions }
    },
    superAdmin: { companyReportsReducer },
    shared: {
        profileReducer,
        decodeJWTReducer: {
            jwtData: { companyID, headquartersCompanyID }
        }
    }
}) => ({
    subscriptions,
    isImpersonating:
        companyID &&
        headquartersCompanyID &&
        companyID !== headquartersCompanyID,
    companyName: name,
    profile: profileReducer.profile || {},
    companyReportsLength: Object.values(
        companyReportsReducer.companyReports
    ).filter(item => item.state === GENERATION_STATE_VAL.WAITING).length
});

export default withRouter(
    connect(
        mapStateToProps,
        { logout }
    )(HeaderProfileContainer)
);
