import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStatsFilters from '../presentational/DashboardStatsFilters';
import updateDashboardFilters from 'actions/companyAdmin/dashboard/sync/updateDashboardFilters';
import fetchPinStats from 'actions/companyAdmin/dashboard/async/fetchPinStats';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import _ from 'lodash';
import moment from 'moment';

class DashboardStatsFiltersContainer extends Component {
    state = {
        serviceOptions: {},
        statusOptions: {}
    };

    render() {
        const { serviceOptions, statusOptions } = this.state;
        const { filters } = this.props;
        const today = new Date();
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
                today={today}
            />
        );
    }

    handleChange = (name, value) => {
        const { updateDashboardFilters } = this.props;
        updateDashboardFilters(name, value);
    };
    handleDateChange = (name, date) => {
        const {
            updateDashboardFilters,
            filters: { startDate, endDate }
        } = this.props;
        if (name === 'startDate') {
            const diffFromEnd = Math.abs(moment(endDate).diff(date, 'days'));
            if (diffFromEnd > 30) {
                const newEnd = moment(date)
                    .add(30, 'days')
                    .toDate();
                updateDashboardFilters('endDate', newEnd);
            }
        } else if (name === 'endDate') {
            const diffFromStart = Math.abs(
                moment(startDate).diff(date, 'days')
            );
            if (diffFromStart > 30) {
                const newStart = moment(date)
                    .subtract(30, 'days')
                    .toDate();
                updateDashboardFilters('startDate', newStart);
            }
        }
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

const mapDispatchToProps = {
    updateDashboardFilters,
    fetchPinStats
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardStatsFiltersContainer);
