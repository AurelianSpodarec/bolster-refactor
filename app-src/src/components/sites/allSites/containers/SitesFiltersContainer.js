import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesSearchTerm from 'actions/sites/sync/updateSitesSearchTerm';
import setSitesFilterStatus from 'actions/sites/sync/setSitesFilterStatus';

import SitesFilters from '../presentational/SitesFilters';

class SitesFiltersContainer extends Component {
    state = {
        statusOptions: {
            active: { value: 'active', text: 'Active' },
            readOnly: { value: 'readOnly', text: 'Read only' },
            archived: { value: 'archived', text: 'Archived' }
        }
    };

    render() {
        const { statusOptions } = this.state;
        const { searchTerm, status } = this.props;

        return (
            <SitesFilters
                searchTerm={searchTerm}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[status]}
                handleSearchTermChange={this.handleSearchTermChange}
                handleSelectStatus={this.handleSelectStatus}
            />
        );
    }

    handleSearchTermChange = e => {
        e.preventDefault();

        this.props.dispatch(updateSitesSearchTerm(e.target.value));
    };

    handleSelectStatus = e => {
        e.preventDefault();

        this.props.dispatch(setSitesFilterStatus(e.target.value));
    };
}

export default connect(({ sitesReducer }) => ({
    nameFilter: sitesReducer.nameFilter,
    statusFilter: sitesReducer.statusFilter
}))(SitesFiltersContainer);
