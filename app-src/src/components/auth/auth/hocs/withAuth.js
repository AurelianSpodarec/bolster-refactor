import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function(ProtectedComponent) {
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

        _authenticate = token => {
            return new Promise((resolve, reject) => {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp < new Date().valueOf() / 1000;

                if (isExpired) reject();
                resolve();
            });
        };
    }

    return connect(state => state.authReducer)(WithAuth);
}
