import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';

import SitesFilters from '../presentational/SitesFilters';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';
import { convertArrToObj } from 'helpers/generic';

const statusOptions = Object.keys(ACCESS_TYPES).map(key => ({
    value: key,
    text: ACCESS_TYPES[key]
}));
class SitesFiltersContainer extends Component {
    state = {
        statusOptions: convertArrToObj(statusOptions, 'value')
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
