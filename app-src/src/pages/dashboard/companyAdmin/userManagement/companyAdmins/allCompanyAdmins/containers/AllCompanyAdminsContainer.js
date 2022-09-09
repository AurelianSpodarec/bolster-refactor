import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USERS_ADMIN_TABS } from 'constants/shared/tabNames';

import AllCompanyAdmins from '../presentational/AllCompanyAdmins';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchInactiveCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchInactiveCompanyUsers';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

export class AllCompanyAdminsContainer extends Component {
    render() {
        return <AllCompanyAdmins />;
    }

    componentDidMount = () => {
        const { fetchAllCompanyUsers, fetchInactiveCompanyUsers, setTabs } = this.props;

        setTabs(Object.values(USERS_ADMIN_TABS), USERS_ADMIN_TABS.ACTIVE);
        fetchAllCompanyUsers();
        fetchInactiveCompanyUsers();
    };
}

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    fetchAllCompanyUsers: () => {
        dispatch(fetchCompanyUsers());
    },
    fetchInactiveCompanyUsers: () => {
        dispatch(fetchInactiveCompanyUsers());
    },
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab)),
});

export default connect(null, mapDispatchToProps)(AllCompanyAdminsContainer);
