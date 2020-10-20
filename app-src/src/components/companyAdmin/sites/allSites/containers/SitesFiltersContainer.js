import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';
import { companyAdminSitesSort } from 'constants/shared/sortAndFilterOptions';

import SitesFilters from '../presentational/SitesFilters';
import { DEFAULT_SITES_SORT_NAMES } from 'constants/companyAdmin/enums';
import { enumFormat } from 'helpers/generic';

class SitesFiltersContainer extends Component {
    render() {
        const { name, status, sortBy } = this.props.filters;
        const { statusOptions } = companyAdminSitesSort;

        return (
            <SitesFilters
                name={name}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={status}
                sortOptions={enumFormat(DEFAULT_SITES_SORT_NAMES)}
                selectedSort={sortBy}
                handleChange={this.handleChange}
                onMobile={this.props.onMobile}
            />
        );
    }

    componentDidMount = () => {
        const { dispatch, defaultSitesSort } = this.props;

        dispatch(updateSitesFilters('name', ''));
        dispatch(updateSitesFilters('status', 'active'));
        dispatch(updateSitesFilters('sortBy', defaultSitesSort || 1));
    };

    handleChange = (name, value) => {
        const { dispatch } = this.props;
        dispatch(updateSitesFilters(name, value));
    };
}

export default connect(
    ({
        companyAdmin: {
            companySettingsReducer: {
                companySettings: { defaultSitesSort },
            },
        },
        shared: {
            sitesFilterReducer: { filters },
            mobileReducer: { onMobile },
        },
    }) => ({
        filters,
        onMobile,
        defaultSitesSort,
    }),
)(SitesFiltersContainer);
