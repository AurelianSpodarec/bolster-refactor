import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';

import SitesFilters from '../presentational/SitesFilters';

class SitesFiltersContainer extends Component {
    state = {
        statusOptions: {
            active: { value: 'active', text: 'Active' },
            'read only': { value: 'read only', text: 'Read only' },
            archived: { value: 'archived', text: 'Archived' }
        }
    };

    render() {
        const { statusOptions } = this.state;
        const { name, status } = this.props.filters;

        return (
            <SitesFilters
                name={name}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[status]}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = e => {
        e.preventDefault();

        const { dispatch } = this.props;
        dispatch(updateSitesFilters(e.target.name, e.target.value));
    };
}

export default connect(({ companyAdmin: { sitesReducer } }) => ({
    filters: sitesReducer.filters
}))(SitesFiltersContainer);
