import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FrontEndHeader from '../presentational/FrontEndHeader';
import { logout } from 'actions/shared/auth/sync/logout';

class FrontEndHeaderContainer extends Component {
    render() {
        const { isSuperAdmin, isCompanyAdmin, isClientAccess } = this.props;

        return (
            <FrontEndHeader
                isSuperAdmin={isSuperAdmin}
                isCompanyAdmin={isCompanyAdmin}
                isClientAccess={isClientAccess}
                logout={this.logout}
            />
        );
    }

    logout = () => {
        const { history, logout } = this.props;
        logout();
        history.push('/');
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

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logout());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FrontEndHeaderContainer)
);
