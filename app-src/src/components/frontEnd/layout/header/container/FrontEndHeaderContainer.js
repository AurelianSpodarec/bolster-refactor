import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FrontEndHeader from '../presentational/FrontEndHeader';

class FrontEndHeaderContainer extends Component {
    render() {
        const { isSuperAdmin, isCompanyAdmin, isClientAccess } = this.props;

        return (
            <FrontEndHeader
                isSuperAdmin={isSuperAdmin}
                isCompanyAdmin={isCompanyAdmin}
                isClientAccess={isClientAccess}
                logout={this._logout}
            />
        );
    }
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
    )(FrontEndHeaderContainer)
);
