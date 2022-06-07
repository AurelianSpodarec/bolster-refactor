import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function (ProtectedComponent) {
    class WithActiveAccount extends React.Component {
        render() {
            const { isFetching } = this.props;
            if (!this._isActive() && isFetching) return null;
            if (!this._isActive()) return <Redirect to="/company/deactivated" />;

            return <ProtectedComponent {...this.props} />;
        }

        _isActive = () => {
            const { users, companyUserID } = this.props;

            if (!users[companyUserID].isCompanyDisabled) return true;
        };
    }

    const mapStateToProps = ({
        companyAdmin: {
            companyUsersReducer: { users },
        },
        shared: {
            decodeJWTReducer: { jwtData },
        },
    }) => ({
        users,
        companyUserID: jwtData.companyUserID,
    });
    return connect(mapStateToProps)(WithActiveAccount);
}
