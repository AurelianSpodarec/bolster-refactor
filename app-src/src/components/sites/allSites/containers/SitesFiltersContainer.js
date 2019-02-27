import React, { Component } from 'react';

import SitesFilters from '../presentational/SitesFilters';

class SitesFilltersContainer extends Component {
    state = {
        searchTerm: '',
        statusOptions: {
            1: { value: 1, text: 'Active' },
            2: { value: 2, text: 'Read only' },
            3: { value: 3, text: 'Archived' }
        },
        selectedStatus: 0
    };

    render() {
        const { searchTerm, statusOptions, selectedStatus } = this.state;

        return (
            <SitesFilters
                searchTerm={searchTerm}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[selectedStatus]}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.state.name]: e.target.value
        });
    };
}

export default SitesFilltersContainer;
