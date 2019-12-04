import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardStatsFilters from '../presentational/DashboardStatsFilters';
import updateDashboardFilters from 'actions/companyAdmin/dashboard/sync/updateDashboardFilters';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchPinStats from 'actions/companyAdmin/dashboard/async/fetchPinStats';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import _ from 'lodash';
import moment from 'moment';
import { isEmpty } from 'helpers/generic';

class DashboardStatsFiltersContainer extends Component {
    state = {
        serviceOptions: {},
        statusOptions: {}
    };

    render() {
        const { statusOptions } = this.state;
        const { filters, isFetching, error, services, subscriptions } = this.props;
        const today = new Date();

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(services) || isEmpty(subscriptions)}
            >
                <DashboardStatsFilters
                    serviceOptions={Object.values(this._getRelevantServices())}
                    statusOptions={Object.values(statusOptions)}
                    selectedService={this._getRelevantServices()[filters.serviceID]}
                    selectedStatus={statusOptions[filters.status]}
                    selectedStartDate={filters.startDate}
                    selectedEndDate={filters.endDate}
                    handleDateChange={this.handleDateChange}
                    handleChange={this.handleChange}
                    today={today}
                />
            </BlockContainer>
        );
    }

    handleChange = (name, value) => {
        const { updateDashboardFilters } = this.props;
        updateDashboardFilters(name, value);

        if (name === 'serviceID') localStorage.setItem('selectedService', value);
        if (name === 'status') localStorage.setItem('selectedStatus', value);
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
            localStorage.setItem('selectedStartDate', date);
        } else if (name === 'endDate') {
            const diffFromStart = Math.abs(moment(startDate).diff(date, 'days'));
            if (diffFromStart > 30) {
                const newStart = moment(date)
                    .subtract(30, 'days')
                    .toDate();
                updateDashboardFilters('startDate', newStart);
            }
            localStorage.setItem('selectedEndDate', date);
        }
        updateDashboardFilters(name, date);
    };

    componentDidMount = () => {

        const statusOptions = Object.entries(PIN_STATUS_TYPES).map(([key, value]) => ({
            text: value,
            value: key
        }));

        const statusOptionsUpdated = Object.values(statusOptions).reduce((acc, { value, text }) => {
            return { ...acc, [value]: { value, text } };
        }, {});

        this.setState({
            statusOptions: statusOptionsUpdated
        });
    };

    componentDidUpdate = prevProps => {
        const { filters, fetchPinStats } = this.props;
        if (!_.isEqual(prevProps.filters, filters)) {
            fetchPinStats(filters);
            localStorage.setItem('selectedStartDate', filters.startDate);
            localStorage.setItem('selectedEndDate', filters.endDate);
        }
    };

    _getRelevantServices = () => {
        const {
            services,
            subscriptions: { serviceIDs }
        } = this.props;

        const arrServices = Object.values(services);

        return arrServices
            .filter(({ id }) => serviceIDs.includes(id))
            .reduce((acc, { id, name }) => {
                return { ...acc, [id]: { value: id, text: name } };
            }, {});
    };
}

const mapStateToProps = ({
    companyAdmin: {
        servicesReducer: { services, isFetching: isFetchingServices, error: servicesError },
        subscriptionsReducer: {
            subscriptions,
            isFetching: isFetchingSubscriptions,
            error: subscriptionsError
        },
        dashboardReducer: { filters }
    }
}) => ({
    services: services || {},
    subscriptions: subscriptions || [],
    isFetching: isFetchingServices || isFetchingSubscriptions,
    error: servicesError || subscriptionsError,
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
