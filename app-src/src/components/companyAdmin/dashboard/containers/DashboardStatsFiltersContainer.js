import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStatsFilters from '../presentational/DashboardStatsFilters';
import updateDashboardFilters from 'actions/companyAdmin/dashboard/sync/updateDashboardFilters';
import fetchPinStats from 'actions/companyAdmin/dashboard/async/fetchPinStats';
import _ from 'lodash';

class DashboardStatsFiltersContainer extends Component {
    state = {
        serviceOptions: {},
        statusOptions: {
            10: {
                value: 10,
                text: 'Action Required'
            },
            20: {
                value: 20,
                text: 'Installed'
            },
            30: {
                value: 30,
                text: 'Inspected'
            },
            40: {
                value: 40,
                text: 'No Action'
            },
            50: {
                value: 50,
                text: 'Other'
            }
        }
    };
    render() {
        const { serviceOptions, statusOptions } = this.state;
        const { filters } = this.props;

        return (
            <DashboardStatsFilters
                serviceOptions={Object.values(serviceOptions)}
                statusOptions={Object.values(statusOptions)}
                selectedService={serviceOptions[filters.serviceID]}
                selectedStatus={serviceOptions[filters.status]}
                timePeriodStartDate={filters.timePeriodStartDate}
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

        this.setState({ serviceOptions });
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
