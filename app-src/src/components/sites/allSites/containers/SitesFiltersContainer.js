import React, { Component } from 'react';
import { connect } from 'react-redux';

import setSitesFilterStatus from 'actions/sites/sync/setSitesFilterStatus';
import updateSitesSearchTerm from 'actions/sites/sync/updateSitesSearchTerm';

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

        console.log(statusOptions);
        console.log(status);
        return (
            <SitesFilters
                searchTerm={searchTerm}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[status]}
                handleSelectStatus={this.handleSelectStatus}
            />
        );
    }

    handleSelectStatus = e => {
        e.preventDefault();

        this.props.dispatch(setSitesFilterStatus(e.target.value));
    };
}

export default connect(state => state.sitesReducers.sitesFilters)(
    SitesFiltersContainer
);
