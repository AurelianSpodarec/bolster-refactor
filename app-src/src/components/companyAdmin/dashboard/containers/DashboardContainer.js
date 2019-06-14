import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../presentational/Dashboard';
import moment from 'moment';

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
            fetchPinStatusStats
        } = this.props;
        const startDate = moment()
            .subtract(7, 'days')
            .format();

        const startingFilters = {
            serviceID: '',
            status: '',
            startDate,
            endDate: moment().format()
        };

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
    }
});

export default connect(
    null,
    mapDispatchToProps
)(DashboardContainer);
