import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';
import { companyAdminSitesSort } from 'constants/shared/sortAndFilterOptions';

import SitesFilters from '../presentational/SitesFilters';

class SitesFiltersContainer extends Component {
    render() {
        const { name, status, sortBy } = this.props.filters;
        const { statusOptions, sortOptions } = companyAdminSitesSort;

        return (
            <SitesFilters
                name={name}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[status]}
                sortOptions={Object.values(sortOptions)}
                selectedSort={sortOptions[sortBy]}
                handleChange={this.handleChange}
                onMobile={this.props.onMobile}
            />
        );
    }

    componentDidMount = () => {
        const { dispatch } = this.props;

        dispatch(updateSitesFilters('name', ''));
        dispatch(updateSitesFilters('status', ''));
        dispatch(updateSitesFilters('sortBy', ''));
    };

    handleChange = (name, value) => {
        const { dispatch } = this.props;
        dispatch(updateSitesFilters(name, value));
    };
}

export default connect(
    ({
        shared: {
            sitesFilterReducer: { filters },
            mobileReducer: { onMobile }
        }
    }) => ({
        filters,
        onMobile
    })
)(SitesFiltersContainer);
