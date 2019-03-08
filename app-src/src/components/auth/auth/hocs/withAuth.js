import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import authorize from 'actions/auth/async/authorize';

export default function(ProtectedComponent) {
    class WithAuth extends React.Component {
        render() {
            const { checkComplete, isAuthorized } = this.props;

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
            this.props.dispatch(authorize());
        }
    }

    return connect(state => state.authReducer)(WithAuth);
}
