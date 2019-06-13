import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';

import DashboardStatsFilters from '../presentational/DashboardStatsFilters';
import updateDashboardFilters from 'actions/companyAdmin/dashboard/sync/updateDashboardFilters';
import fetchPinStats from 'actions/companyAdmin/dashboard/async/fetchPinStats';
import _ from 'lodash';

class DashboardStatsFiltersContainer extends Component {
    state = {
        serviceOptions: {},
        daysToReturn: {
            '7': { value: '7', text: '7 days' },
            '14': { value: '14', text: '14 days' },
            '31': { value: '31', text: '31 days' }
        }
    };
    render() {
        const { serviceOptions, daysToReturn } = this.state;
        const { filters } = this.props;

        return (
            <DashboardStatsFilters
                serviceOptions={Object.values(serviceOptions)}
                selectedService={serviceOptions[filters.serviceID]}
                daysToReturn={Object.values(daysToReturn)}
                selectedPeriod={daysToReturn[filters.daysToReturn]}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = (name, value) => {
        const { updateDashboardFilters } = this.props;
        updateDashboardFilters(name, value);
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
            console.error(filters);
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
