import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';

import SitesFilters from '../presentational/SitesFilters';

class SitesFiltersContainer extends Component {
    render() {
        const { name, status } = this.props.filters;

        const statusOptions = {
            archived: { value: 'archived', text: 'Archived' }
        };

        return (
            <SitesFilters
                name={name}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={statusOptions[status]}
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
