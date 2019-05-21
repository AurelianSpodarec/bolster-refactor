import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import companyFetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import ClientApp from '../presentational/ClientApp';

import { MENU_TABS } from 'constants/shared/tabNames';

class ClientAppContainer extends Component {
    render() {
        return <ClientApp />;
    }

    componentDidMount = () => {
        const { fetchHomeData, selectClientMenuTab } = this.props;
        fetchHomeData();
        selectClientMenuTab();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchHomeData: () => {
        dispatch(fetchCompanySettings());
        dispatch(fetchProfile());
        dispatch(fetchSingleCompany());
        // dispatch(fetchCompanyReports());
        dispatch(decodeJWT());
        dispatch(companyFetchAllServices());
    },
    selectClientMenuTab: () => {
        dispatch(selectMenuTab(MENU_TABS.CLIENT));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ClientAppContainer);
