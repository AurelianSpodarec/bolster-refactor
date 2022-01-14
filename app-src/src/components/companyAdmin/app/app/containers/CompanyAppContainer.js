import React, { Component } from 'react';
import { batch, connect } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import companyFetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchCreditLogs from 'actions/companyAdmin/creditLogs/async/fetchCreditLogs';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';
import fetchLatestAppVersion from 'actions/companyAdmin/app/async/fetchLatestAppVersion';

import CompanyApp from '../presentational/CompanyApp';

import { MENU_TABS } from 'constants/shared/tabNames';
import fetchIncomingTransferRequests from 'actions/companyAdmin/transferRequests/async/fetchIncomingTransferRequests';
import fetchOutgoingTransferRequests from 'actions/companyAdmin/transferRequests/async/fetchOutgoingTransferRequests';
import fetchPendingInvites from 'actions/companyAdmin/pendingInvites/fetchPendingInvites';
import fetchOutgoingInvites from 'actions/companyAdmin/pendingInvites/fetchOutgoingInvites';
import fetchSingleCompanyUser from 'actions/companyAdmin/userManagement/async/fetchSingleCompanyUser';
import withAuth from 'components/shared/auth/auth/hocs/withAuth';
import { AUTH_TYPES } from 'constants/shared/auth';
import fetchRecentUpdates from 'actions/companyAdmin/recentUpdates/async/fetchRecentUpdates';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';

class CompanyAppContainer extends Component {
    render() {
        return <CompanyApp />;
    }

    componentDidMount = () => {
        const {
            fetchHomeData,
            fetchCompanySettings,
            selectCompanyMenuTab,
            decodeJWT,
            fetchSingleCompanyUser,
            fetchLatestAppVersion,
        } = this.props;

        decodeJWT().then(({ payload = {} }) => {
            fetchSingleCompanyUser(payload.companyUserID);
            if (payload.companyID) {
                fetchHomeData();
            }
        });
        fetchCompanySettings().then(({ payload = {} }) => {
            if (payload.colourCode) {
                localStorage.setItem('colourCode', payload.colourCode);
            }
        });

        selectCompanyMenuTab();
        fetchLatestAppVersion();
    };

    componentDidUpdate = prevProps => {
        const {
            companyID,
            fetchHomeData,
            fetchLatestAppVersion,
            fetchCompanySettings,
            resetFilterOptions,
        } = this.props;
        if (companyID !== prevProps.companyID) {
            resetFilterOptions();
            fetchHomeData();
            fetchLatestAppVersion();
            fetchCompanySettings().then(({ payload = {} }) => {
                if (payload.colourCode) {
                    localStorage.setItem('colourCode', payload.colourCode);
                }
            });
        }
    };
}

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: { jwtData },
    },
}) => ({
    companyID: jwtData.companyID,
});

const mapDispatchToProps = dispatch => ({
    fetchHomeData: () => {
        batch(() => {
            dispatch(fetchProfile());
            dispatch(fetchSingleCompany());
            dispatch(fetchCompanyReports());
            dispatch(companyFetchAllServices());
            dispatch(fetchAllSubscriptions());
            dispatch(fetchCreditLogs());
            dispatch(fetchAllCredits());
            dispatch(fetchIncomingTransferRequests());
            dispatch(fetchOutgoingTransferRequests());
            dispatch(fetchPendingInvites());
            dispatch(fetchOutgoingInvites());
            dispatch(fetchRecentUpdates());
        });
    },
    decodeJWT: () => dispatch(decodeJWT()),
    fetchCompanySettings: () => dispatch(fetchCompanySettings()),
    selectCompanyMenuTab: () => dispatch(selectMenuTab(MENU_TABS.COMPANY_USER)),
    fetchSingleCompanyUser: companyUserID => dispatch(fetchSingleCompanyUser(companyUserID)),
    fetchLatestAppVersion: () => dispatch(fetchLatestAppVersion()),
    resetFilterOptions: () => dispatch(resetFilterOptions()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(CompanyAppContainer);
export default withAuth(withConnect, AUTH_TYPES.COMPANY);
