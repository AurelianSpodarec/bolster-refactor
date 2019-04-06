import React from 'react';
import { Redirect } from 'react-router-dom';

import { authenticate } from 'helpers/api';
import { AUTH_TYPES } from 'constants/shared/auth';
const { COMPANY, SUPER_ADMIN, CLIENT } = AUTH_TYPES;

export default function(ProtectedComponent, authType = COMPANY) {
    class WithAuth extends React.Component {
        state = {
            checkComplete: false,
            isAuthorized: false
        };

        render() {
            const { checkComplete, isAuthorized } = this.state;

            if (!checkComplete) return null;
            if (!isAuthorized) return <Redirect to="/auth/login" />;

            return (
                <ProtectedComponent
                    curUrl={this.props.location.pathname}
                    {...this.props}
                />
            );
        }

        componentDidMount() {
            this._authenticate(localStorage.getItem('token'))
                .then(() => {
                    this.setState({
                        checkComplete: true,
                        isAuthorized: true
                    });
                })
                .catch(() => {
                    this.setState({
                        checkComplete: true,
                        isAuthorized: false
                    });
                });
        }

        _authenticate = () => {
            return new Promise((resolve, reject) => {
                authenticate()
                    .then(({ companyID, isSuperAdmin, isClient }) => {
                        if (authType === COMPANY)
                            return companyID ? resolve() : reject();
                        if (authType === SUPER_ADMIN)
                            return isSuperAdmin ? resolve() : reject();
                        if (authType === CLIENT)
                            return isClient ? resolve() : reject();

                        return reject();
                    })
                    .catch(reject);
            });
        };
    }

    return WithAuth;
}
