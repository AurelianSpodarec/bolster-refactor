import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import fetchMessages from 'actions/companyAdmin/messages/async/fetchMessages';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
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
import fetchSingleCompanyUser from 'actions/companyAdmin/userManagement/async/fetchSingleCompanyUser';

class CompanyAppContainer extends Component {
    render() {
        return <CompanyApp />;
    }

    componentDidMount = () => {
        const {
            fetchHomeData,
            fetchCompanySettings,
            selectCompanyMenuTab
        } = this.props;

        fetchHomeData();
        fetchCompanySettings().then(({ payload = {} }) => {
            if (payload.colourCode) {
                localStorage.setItem('colourCode', payload.colourCode);
            }
        });

        selectCompanyMenuTab();
    };

    componentDidUpdate = prevProps => {
        const { companyUserID, fetchSingleCompanyUser } = this.props;

        if (!prevProps.companyUserID && companyUserID) {
            fetchSingleCompanyUser(companyUserID);
        }
    };
}
const mapStateToProps = ({
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID }
        }
    }
}) => ({
    companyUserID
});

const mapDispatchToProps = dispatch => ({
    fetchHomeData: () => {
        dispatch(fetchProfile());
        dispatch(fetchSingleCompany());
        dispatch(fetchMessages());
        dispatch(fetchCompanyReports());
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
    fetchCompanySettings: () => {
        return dispatch(fetchCompanySettings());
    },
    selectCompanyMenuTab: () => {
        dispatch(selectMenuTab(MENU_TABS.COMPANY_USER));
    },
    fetchSingleCompanyUser: companyUserID => {
        dispatch(fetchSingleCompanyUser(companyUserID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyAppContainer);
