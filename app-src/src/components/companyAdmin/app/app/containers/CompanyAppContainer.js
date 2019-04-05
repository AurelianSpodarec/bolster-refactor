import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/companyAdmin/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companyAdmin/companies/async/fetchSingleCompany';
import fetchMessages from 'actions/companyAdmin/messages/async/fetchMessages';
import fetchGenerationQueue from 'actions/companyAdmin/generationQueue/async/fetchGenerationQueue';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import companyFetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchCreditLogs from 'actions/companyAdmin/creditLogs/async/fetchCreditLogs';

import CompanyApp from '../presentational/CompanyApp';

class CompanyAppContainer extends Component {
    render() {
        return <CompanyApp />;
    }

    componentDidMount = () => {
        this._callAuthenticatedActions();
    };
}

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
    }
});

export default connect(
    null,
    mapDispatchToProps
)(CompanyAppContainer);
