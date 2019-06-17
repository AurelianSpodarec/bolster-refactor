import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import clientFetchAllServices from 'actions/client/services/async/clientFetchAllServices';
import fetchClientCompanyReports from 'actions/client/reports/queue/async/fetchClientCompanyReports';
import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import ClientApp from '../presentational/ClientApp';

import { MENU_TABS } from 'constants/shared/tabNames';
import { getSelectedCompanyForClient } from 'helpers/generic';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

class ClientAppContainer extends Component {
    render() {
        return <ClientApp />;
    }

    componentDidMount = () => {
        const { fetchHomeData, selectClientMenuTab } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchHomeData(selectedCompanyID);
        selectClientMenuTab();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchHomeData: companyID => {
        dispatch(fetchProfile());
        dispatch(fetchClientCompanyReports(companyID));
        dispatch(decodeJWT());
        dispatch(clientFetchAllServices());
        dispatch(fetchAllSubscriptions());
    },
    selectClientMenuTab: () => {
        dispatch(selectMenuTab(MENU_TABS.CLIENT));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ClientAppContainer);
