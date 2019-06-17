import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MENU_TABS } from 'constants/shared/tabNames';
import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';
import AdminApp from '../presentational/AdminApp';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import fetchProfile from 'actions/shared/profile/async/fetchProfile';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

class AdminAppContainer extends Component {
    render() {
        return <AdminApp />;
    }

    componentDidMount() {
        const { selectAdminMenuTab, decodeJWT, fetchHomeData } = this.props;
        selectAdminMenuTab();
        decodeJWT();
        fetchHomeData();
    }
}

const mapDispatchToProps = dispatch => ({
    selectAdminMenuTab: () => {
        dispatch(selectMenuTab(MENU_TABS.SUPER_ADMIN));
    },
    decodeJWT: () => {
        dispatch(decodeJWT());
    },
    fetchHomeData: () => {
        dispatch(fetchProfile());
        dispatch(fetchAllSubscriptions());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AdminAppContainer);
