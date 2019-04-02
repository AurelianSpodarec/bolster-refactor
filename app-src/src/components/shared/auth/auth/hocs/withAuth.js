import React from 'react';
import { Redirect } from 'react-router-dom';

import { authenticate } from 'helpers/api';

export default function(ProtectedComponent, requiresAdmin = false) {
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
                    .then(() => {
                        resolve();
                        if (requiresAdmin) {
                            // return isAdmin ? resolve() : reject()
                        }

                        return resolve();
                    })
                    .catch(reject);
            });
        };
    }

    return WithAuth;
}
