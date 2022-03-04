import React from 'react';
import { batch, connect } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import companyFetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
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
import withAuth from 'components/shared/auth/auth/hocs/withAuth';
import { AUTH_TYPES } from 'constants/shared/auth';
import fetchMessagesBasic from 'actions/companyAdmin/messages/async/fetchMessagesBasic';
import fetchRecentUpdates from 'actions/companyAdmin/recentUpdates/async/fetchRecentUpdates';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';

class CompanyAppContainer extends React.PureComponent {
    render() {
        return <CompanyApp />;
    }

    componentDidMount = () => {
        const { selectCompanyMenuTab, decodeJWT, fetchSingleCompanyUser } = this.props;

        decodeJWT().then(({ payload = {} }) => {
            if (payload.companyUserID) {
                fetchSingleCompanyUser(payload.companyUserID);
            }
            // home data then fetched in componentDidUpdate
        });

        selectCompanyMenuTab();
    };

    componentDidUpdate = prevProps => {
        const {
            companyID,
            fetchHomeData,
            fetchCompanySettings,
            resetFilterOptions,
            fetchCompanyData,
        } = this.props;
        if (companyID !== undefined && companyID !== prevProps.companyID) {
            resetFilterOptions();
            fetchCompanyData();
            fetchHomeData();
            if (companyID) {
                fetchCompanyData();
                fetchCompanySettings().then(({ payload = {} }) => {
                    if (payload.colourCode) {
                        localStorage.setItem('colourCode', payload.colourCode);
                    }
                });
            }
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
        });
    },
    fetchCompanyData: () => {
        batch(() => {
            dispatch(fetchRecentUpdates());
            dispatch(fetchAllCredits());
            dispatch(fetchIncomingTransferRequests());
            dispatch(fetchOutgoingTransferRequests());
            dispatch(fetchPendingInvites());
            dispatch(fetchOutgoingInvites());
            dispatch(fetchMessagesBasic());
            dispatch(fetchCompanyReports());
            dispatch(companyFetchAllServices());
            dispatch(fetchAllSubscriptions());
            dispatch(fetchLatestAppVersion());
        });
    },
    decodeJWT: () => dispatch(decodeJWT()),
    fetchCompanySettings: () => dispatch(fetchCompanySettings()),
    selectCompanyMenuTab: () => dispatch(selectMenuTab(MENU_TABS.COMPANY_USER)),
    fetchSingleCompanyUser: companyUserID => dispatch(fetchSingleCompanyUser(companyUserID)),
    resetFilterOptions: () => dispatch(resetFilterOptions()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(CompanyAppContainer);
export default withAuth(withConnect, AUTH_TYPES.COMPANY);
