import React from 'react';
import { connect } from 'react-redux';

import ClientApp from '../presentational/ClientApp';
import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchClientCompanyReports from 'actions/client/reports/queue/async/fetchClientCompanyReports';
import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

import { MENU_TABS } from 'constants/shared/tabNames';
import { getSelectedCompanyForClient, componentDidMount } from 'helpers/generic';

const ClientAppContainer = ({ fetchHomeData, selectClientMenuTab }) => {
    componentDidMount(() => {
        const selectedCompanyID = getSelectedCompanyForClient();
        fetchHomeData(selectedCompanyID);
        selectClientMenuTab();
    });

    return <ClientApp />;
};

const mapDispatchToProps = dispatch => ({
    fetchHomeData: companyID => {
        dispatch(fetchProfile());
        dispatch(fetchClientCompanyReports(companyID));
        dispatch(decodeJWT());
        dispatch(fetchAllSubscriptions());
    },
    selectClientMenuTab: () => dispatch(selectMenuTab(MENU_TABS.CLIENT)),
});

export default connect(null, mapDispatchToProps)(ClientAppContainer);
