import React, { Component } from 'react';
import { connect } from 'react-redux';

import SitesTable from '../presentational/SitesTable';

class SitesListContainer extends Component {
    render() {
        const { sites, isFetching, error } = this.props;
        const tableHeaders = ['Site name', 'Owned by', 'Premissions', 'Action'];

        return (
            <SitesTable
                headers={tableHeaders}
                sites={sites}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    getFilteredSites = () => {
        const { sites, filters } = this.props;
        return sites
            .filter(site => site.name.includes(filters.name))
            .filter(site => site);
    };
}

const mapStateToProps = ({ sitesReducer }) => ({
    sites: Object.values(sitesReducer.sites),
    isFetching: sitesReducer.isFetching,
    error: sitesReducer.error,
    filters: sitesReducer.sitesFilters
});

export default connect(mapStateToProps)(SitesListContainer);
