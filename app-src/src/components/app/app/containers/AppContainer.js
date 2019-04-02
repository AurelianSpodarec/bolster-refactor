import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { authenticate } from 'helpers/api';
import fetchProfile from 'actions/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companies/async/fetchSingleCompany';
import fetchNotifications from 'actions/notifications/async/fetchNotifications';
import fetchMessages from 'actions/messages/async/fetchMessages';
import fetchGenerationQueue from 'actions/generationQueue/async/fetchGenerationQueue';
import decodeJWT from 'actions/jwt/async/decodeJWT';

import App from '../presentational/App';
import fetchAllSubscriptions from 'actions/subscriptions/async/fetchAllSubscriptions';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';

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
        authenticate()
            .then(() => {
                const { fetchHomeData, decodeJWT } = this.props;
                fetchHomeData();
                decodeJWT();
            })
            .catch(() => {});
    };
}

const mapStateToProps = ({ loginReducer }) => ({
    loginSuccess: loginReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    fetchHomeData: () => {
        dispatch(fetchProfile());
        dispatch(fetchSingleCompany());
        dispatch(fetchNotifications());
        dispatch(fetchMessages());
        dispatch(fetchGenerationQueue());
        dispatch(decodeJWT());
        dispatch(fetchAllServices());
        dispatch(fetchAllSubscriptions());
    },
    decodeJWT: () => {
        dispatch(decodeJWT());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
