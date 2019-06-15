import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStatsFilters from '../presentational/DashboardStatsFilters';
import updateDashboardFilters from 'actions/companyAdmin/dashboard/sync/updateDashboardFilters';
import fetchPinStats from 'actions/companyAdmin/dashboard/async/fetchPinStats';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import _ from 'lodash';

class DashboardStatsFiltersContainer extends Component {
    state = {
        serviceOptions: {},
        statusOptions: {}
    };

    render() {
        const { serviceOptions, statusOptions } = this.state;
        const { filters } = this.props;

        return (
            <DashboardStatsFilters
                serviceOptions={Object.values(serviceOptions)}
                statusOptions={Object.values(statusOptions)}
                selectedService={serviceOptions[filters.serviceID]}
                selectedStatus={statusOptions[filters.status]}
                selectedStartDate={filters.startDate}
                selectedEndDate={filters.endDate}
                handleDateChange={this.handleDateChange}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = (name, value) => {
        const { updateDashboardFilters } = this.props;
        updateDashboardFilters(name, value);
    };
    handleDateChange = (name, date) => {
        const { updateDashboardFilters } = this.props;
        updateDashboardFilters(name, date);
    };

    componentDidMount = () => {
        const { services } = this.props;

        const serviceOptions = Object.values(services).reduce(
            (acc, { id, name }) => {
                return { ...acc, [id]: { value: id, text: name } };
            },
            {}
        );

        const statusOptions = Object.entries(PIN_STATUS_TYPES).map(
            ([key, value]) => ({
                text: value,
                value: key
            })
        );

        const statusOptionsUpdated = Object.values(statusOptions).reduce(
            (acc, { value, text }) => {
                return { ...acc, [value]: { value, text } };
            },
            {}
        );

        this.setState({ serviceOptions, statusOptions: statusOptionsUpdated });
    };

    componentDidUpdate = prevProps => {
        const { filters, fetchPinStats } = this.props;
        if (!_.isEqual(prevProps.filters, filters)) {
            fetchPinStats(filters);
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        servicesReducer: {
            services,
            isFetching: isFetchingServices,
            error: servicesError
        },
        dashboardReducer: { filters }
    }
}) => ({
    services: services || {},
    isFetching: isFetchingServices,
    error: servicesError,
    filters
});

const mapDispatchToProps = dispatch => ({
    updateDashboardFilters: (fieldName, searchTerm) => {
        dispatch(updateDashboardFilters(fieldName, searchTerm));
    },
    fetchPinStats: filterBody => {
        dispatch(fetchPinStats(filterBody));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardStatsFiltersContainer);
