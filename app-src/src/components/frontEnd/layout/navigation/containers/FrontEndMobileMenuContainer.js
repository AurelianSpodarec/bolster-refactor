import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import FrontEndMobileMenu from '../presentational/FrontEndMobileMenu';

class FrontEndMobileMenuContainer extends Component {
    state = {
        menuOpen: false
    };

    render() {
        const { isSuperAdmin, isCompanyAdmin, isClientAccess } = this.props;

        return (
            <FrontEndMobileMenu
                {...this.state}
                isSuperAdmin={isSuperAdmin}
                isCompanyAdmin={isCompanyAdmin}
                isClientAccess={isClientAccess}
                handleMenuToggle={this._handleMenuToggle}
                handleLinkClick={this._handleLinkClick}
                logout={this._logout}
            />
        );
    }

    _handleMenuToggle = e => {
        e.preventDefault();
        const { menuOpen } = this.state;

        this.setState({
            menuOpen: !menuOpen
        });
    };

    _handleLinkClick = () => {
        const { menuOpen } = this.state;
        this.setState({
            menuOpen: !menuOpen
        });
    };

    _logout = e => {
        e.preventDefault();
        localStorage.setItem('token', '');
    };
}

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: { jwtData }
    }
}) => ({
    isSuperAdmin: jwtData.isSuperAdmin,
    isCompanyAdmin: !!jwtData.companyID,
    isClientAccess: jwtData.isClientAccess
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(FrontEndMobileMenuContainer)
);
