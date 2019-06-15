import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../presentational/Dashboard';
import moment from 'moment';

import { DASHBOARD_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

import fetchPinStats from 'actions/companyAdmin/dashboard/async/fetchPinStats';
import updateDashboardFilters from 'actions/companyAdmin/dashboard/sync/updateDashboardFilters';
import fetchPinStatusStats from 'actions/companyAdmin/dashboard/async/fetchPinStatusStats';

class DashboardContainer extends Component {
    render() {
        return <Dashboard />;
    }

    componentDidMount = () => {
        const {
            updateDashboardFilters,
            fetchPinStats,
            fetchPinStatusStats,
            setTabs
        } = this.props;
        const startDate = moment()
            .subtract(7, 'days')
            .toDate();

        const startingFilters = {
            serviceID: '',
            status: '',
            startDate: startDate,
            endDate: moment().toDate()
        };

        setTabs(Object.values(DASHBOARD_TABS), DASHBOARD_TABS.OPERATIVES);

        updateDashboardFilters('serviceID', startingFilters.serviceID);
        updateDashboardFilters('status', startingFilters.status);
        updateDashboardFilters('startDate', startingFilters.startDate);
        updateDashboardFilters('endDate', startingFilters.endDate);

        fetchPinStats(startingFilters);
        fetchPinStatusStats();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchPinStats: filterBody => dispatch(fetchPinStats(filterBody)),
    fetchPinStatusStats: () => dispatch(fetchPinStatusStats()),
    updateDashboardFilters: (fieldName, searchTerm) => {
        dispatch(updateDashboardFilters(fieldName, searchTerm));
    },
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab))
});

export default connect(
    null,
    mapDispatchToProps
)(DashboardContainer);
