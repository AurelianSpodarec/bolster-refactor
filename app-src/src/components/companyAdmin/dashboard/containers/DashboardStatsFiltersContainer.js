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
        statusOptions: {},
        monthOptions: {},
        selectedMonth: {},
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
                    handleMonthChange={this.handleMonthChange}
                    monthOptions={Object.keys(this.state.monthOptions).map(item => ({
                        text: item,
                        value: item,
                    }))}
                    selectedMonth={this.state.selectedMonth}
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
        const { updateDashboardFilters } = this.props;

        const [startDateValue, endDateValue] = date;

        const diffFromEnd = Math.abs(moment(endDateValue).diff(startDateValue, 'days'));

        if (diffFromEnd > 90) {
            const newEnd = moment(startDateValue).add(90, 'days').toDate();
            updateDashboardFilters('startDate', startDateValue);
            updateDashboardFilters('endDate', newEnd);
        } else {
            updateDashboardFilters('startDate', startDateValue);
            updateDashboardFilters('endDate', endDateValue);
        }
        localStorage.setItem('selectedStartDate', startDateValue);
        localStorage.setItem('selectedEndDate', endDateValue);
    };

    handleMonthChange = (name, month) => {
        const { updateDashboardFilters } = this.props;

        const { monthOptions } = this.state;

        updateDashboardFilters('startDate', monthOptions[month].startDate);
        updateDashboardFilters('endDate', monthOptions[month].endDate);

        this.setState({ selectedMonth: { text: month } });
    };

    componentDidMount = () => {
        const statusOptions = Object.entries(PIN_STATUS_TYPES).map(([key, value]) => ({
            text: value,
            value: key,
        }));

        const statusOptionsUpdated = Object.values(statusOptions).reduce((acc, { value, text }) => {
            return { ...acc, [value]: { value, text } };
        }, {});

        this.setState({
            statusOptions: statusOptionsUpdated,
        });

        this.createMonthDropdown();
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
            subscriptions: { serviceIDs },
        } = this.props;

        const arrServices = Object.values(services);

        return arrServices
            .filter(({ id }) => serviceIDs.includes(id))
            .reduce((acc, { id, name }) => {
                return { ...acc, [id]: { value: id, text: name } };
            }, {});
    };

    createMonthDropdown = () => {
        const months = new Array(13).fill(0);
        const monthOptions = months.reduce((acc, _, index) => {
            const prevMonth = moment.utc().subtract(index, 'months');
            const label = prevMonth.format('MMM YYYY');
            const startDate = prevMonth.startOf('month').toDate();
            const endDate = prevMonth.endOf('month').toDate();

            acc[label] = {
                startDate,
                endDate,
            };

            return acc;
        }, {});

        this.setState({ monthOptions });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        servicesReducer: { services, isFetching: isFetchingServices, error: servicesError },
        subscriptionsReducer: {
            subscriptions,
            isFetching: isFetchingSubscriptions,
            error: subscriptionsError,
        },
        dashboardReducer: { filters },
    },
}) => ({
    services: services || {},
    subscriptions: subscriptions || [],
    isFetching: isFetchingServices || isFetchingSubscriptions,
    error: servicesError || subscriptionsError,
    filters,
});

const mapDispatchToProps = {
    updateDashboardFilters,
    fetchPinStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsFiltersContainer);
