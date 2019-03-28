import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import fetchProfile from 'actions/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companies/async/fetchSingleCompany';
import fetchNotifications from 'actions/notifications/async/fetchNotifications';
import fetchMessages from 'actions/messages/async/fetchMessages';
import fetchGenerationQueue from 'actions/generationQueue/async/fetchGenerationQueue';
import decodeJWT from 'actions/jwt/async/decodeJWT';

import App from '../presentational/App';

class AppContainer extends Component {
    render() {
        return (
            <Router>
                <App />
            </Router>
        );
    }

    componentDidMount = () => {
        this._callAuthenticatedActions();
    };

    componentDidUpdate = ({ loginSuccess: prevLoginSuccess }) => {
        const { loginSuccess } = this.props;
        if (!prevLoginSuccess && loginSuccess) this._callAuthenticatedActions();
    };

    _callAuthenticatedActions = () => {
        this._authenticate().then(() => {
            const { fetchHomeData, decodeJWT } = this.props;
            fetchHomeData();
            decodeJWT();
        });
    };

    _authenticate = () => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp < new Date().valueOf() / 1000;
            if (isExpired) reject();

            resolve();
        });
    };
}

const mapDispatchToProps = dispatch => ({
    fetchHomeData: () => {
        dispatch(fetchProfile());
        dispatch(fetchSingleCompany());
        dispatch(fetchNotifications());
        dispatch(fetchMessages());
        dispatch(fetchGenerationQueue());
        dispatch(decodeJWT());
    },
    decodeJWT: () => {
        dispatch(decodeJWT());
    }
});

export default connect(
    ({ loginReducer }) => ({ loginSuccess: loginReducer.postSuccess }),
    mapDispatchToProps
)(AppContainer);
