import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';

import SitesFilters from '../presentational/SitesFilters';

class SitesFiltersContainer extends Component {
    render() {
        const { name, status, sortBy } = this.props.filters;

        const statusOptions = {
            active: { value: 'active', text: 'Active' },
            'read only': { value: 'read only', text: 'Read only' },
            archived: { value: 'archived', text: 'Archived' }
        };

        const sortOptions = {
            default: { value: 'default', text: 'Default' },
            ascending: { value: 'ascending', text: 'Date Added (asc)' },
            descending: { value: 'descending', text: 'Date Added (desc)' }
        };

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
