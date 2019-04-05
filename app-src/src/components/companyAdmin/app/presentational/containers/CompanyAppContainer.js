import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { authenticate } from 'helpers/api';
import fetchProfile from 'actions/companyAdmin/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companyAdmin/companies/async/fetchSingleCompany';
import fetchMessages from 'actions/companyAdmin/messages/async/fetchMessages';
import fetchGenerationQueue from 'actions/companyAdmin/generationQueue/async/fetchGenerationQueue';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import companyFetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchCreditLogs from 'actions/companyAdmin/creditLogs/async/fetchCreditLogs';

import App from '../presentational/App';

class CompanyAppContainer extends Component {
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
        dispatch(fetchMessages());
        dispatch(fetchGenerationQueue());
        dispatch(decodeJWT());
        dispatch(companyFetchAllServices());
        dispatch(fetchAllSubscriptions());
        dispatch(fetchCreditLogs());
    },
    decodeJWT: () => {
        dispatch(decodeJWT());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyAppContainer);
