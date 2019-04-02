import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { authenticate } from 'helpers/api';
import fetchProfile from 'actions/companyAdmin/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companyAdmin/companies/async/fetchSingleCompany';
import fetchNotifications from 'actions/companyAdmin/notifications/async/fetchNotifications';
import fetchMessages from 'actions/companyAdmin/messages/async/fetchMessages';
import fetchGenerationQueue from 'actions/companyAdmin/generationQueue/async/fetchGenerationQueue';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';

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
        authenticate()
            .then(() => {
                const { fetchHomeData, decodeJWT } = this.props;
                fetchHomeData();
                decodeJWT();
            })
            .catch(() => {});
    };
}

const mapStateToProps = ({ shared: { loginReducer } }) => ({
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
