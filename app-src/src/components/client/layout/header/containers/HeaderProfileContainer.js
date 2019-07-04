import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { GENERATION_STATE_VAL } from 'constants/companyAdmin/enums';
import HeaderProfile from '../presentational/HeaderProfile';
import { logout } from 'actions/shared/auth/sync/logout';
import { toggleMobileMenu } from 'actions/shared/mobile/sync/toggleMobileMenu';

class HeaderProfileContainer extends Component {
    state = {
        dropdownVisible: false
    };

    render() {
        const { companyName, profile, companyReportsLength } = this.props;
        return (
            <HeaderProfile
                updateNode={node => {
                    this.node = node;
                }}
                logout={this.logout}
                profile={profile}
                companyReportsLength={companyReportsLength}
                dropdownVisible={this.state.dropdownVisible}
                handleClick={this.handleClick}
                companyName={companyName}
            />
        );
    }

    handleClick = () => {
        if (!this.state.dropdownVisible) {
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
            dropdownVisible: !prevState.dropdownVisible
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
        }
    },
    superAdmin: { companyReportsReducer },
    shared: {
        profileReducer,
        mobileReducer: { menuOpen }
        // decodeJWTReducer: {
        //     jwtData: {}
        // }
    }
}) => ({
    companyName: name,
    profile: profileReducer.profile || {},
    companyReportsLength: Object.values(
        companyReportsReducer.companyReports
    ).filter(item => item.state === GENERATION_STATE_VAL.WAITING).length,
    menuOpen
});

export default withRouter(
    connect(
        mapStateToProps,
        { logout, toggleMobileMenu }
    )(HeaderProfileContainer)
);
