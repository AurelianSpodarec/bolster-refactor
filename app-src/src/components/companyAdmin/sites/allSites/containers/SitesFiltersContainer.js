import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';
import { sitesSort } from 'constants/shared/sortAndFilterOptions';

import SitesFilters from '../presentational/SitesFilters';

class SitesFiltersContainer extends Component {
    render() {
        const { name, status, sortBy } = this.props.filters;

        return (
            <SitesFilters
                name={name}
                statusOptions={Object.values(sitesSort.statusOptions)}
                selectedStatus={sitesSort.statusOptions[status]}
                sortOptions={Object.values(sitesSort.sortOptions)}
                selectedSort={sitesSort.sortOptions[sortBy]}
                handleChange={this.handleChange}
                onMobile={this.props.onMobile}
            />
        );
    }

    componentDidMount = () => {
        const { dispatch } = this.props;

        dispatch(updateSitesFilters('name', ''));
        dispatch(updateSitesFilters('status', ''));
    };

    handleChange = (name, value) => {
        const { dispatch } = this.props;
        dispatch(updateSitesFilters(name, value));
    };
}

export default connect(
    ({
        shared: {
            sitesFilterReducer,
            mobileReducer: { onMobile }
        }
    }) => ({
        filters: sitesFilterReducer.filters,
        onMobile
    })
)(SitesFiltersContainer);
