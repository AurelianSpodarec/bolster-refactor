import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import fetchMessages from 'actions/companyAdmin/messages/async/fetchMessages';
import fetchGenerationQueue from 'actions/companyAdmin/generationQueue/async/fetchGenerationQueue';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import companyFetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchCreditLogs from 'actions/companyAdmin/creditLogs/async/fetchCreditLogs';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';

import CompanyApp from '../presentational/CompanyApp';

import { MENU_TABS } from 'constants/shared/tabNames';
import fetchIncomingTransferRequests from 'actions/companyAdmin/transferRequests/async/fetchIncomingTransferRequests';
import fetchOutgoingTransferRequests from 'actions/companyAdmin/transferRequests/async/fetchOutgoingTransferRequests';
import fetchPendingInvites from 'actions/companyAdmin/pendingInvites/fetchPendingInvites';
import fetchOutgoingInvites from 'actions/companyAdmin/pendingInvites/fetchOutgoingInvites';

class CompanyAppContainer extends Component {
    render() {
        return <CompanyApp />;
    }

    componentDidMount = () => {
        const { fetchHomeData, selectCompanyMenuTab } = this.props;
        fetchHomeData();
        selectCompanyMenuTab();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchHomeData: () => {
        dispatch(fetchCompanySettings());
        dispatch(fetchProfile());
        dispatch(fetchSingleCompany());
        dispatch(fetchMessages());
        dispatch(fetchGenerationQueue());
        dispatch(decodeJWT());
        dispatch(companyFetchAllServices());
        dispatch(fetchAllSubscriptions());
        dispatch(fetchCreditLogs());
        dispatch(fetchAllCredits());
        dispatch(fetchIncomingTransferRequests());
        dispatch(fetchOutgoingTransferRequests());
        dispatch(fetchPendingInvites());
        dispatch(fetchOutgoingInvites());
    },
    selectCompanyMenuTab: () => {
        dispatch(selectMenuTab(MENU_TABS.COMPANY_USER));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(CompanyAppContainer);
