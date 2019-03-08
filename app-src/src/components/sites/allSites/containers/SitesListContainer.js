import React, { Component } from 'react';
import { connect } from 'react-redux';

import SitesTable from '../presentational/SitesTable';

class SitesListContainer extends Component {
    render() {
        const { isFetching, error } = this.props;
        const tableHeaders = ['Site name', 'Owned by', 'Premissions', 'Action'];

        return (
            <SitesTable
                headers={tableHeaders}
                sites={this._getFilteredSites()}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    _getFilteredSites = () => {
        const { sites, filters } = this.props;
        const { status, name } = filters;
        return sites
            .filter(site => !status.length || site.status === status)
            .filter(site => site.name.includes(name));
    };
}

const mapStateToProps = ({ sitesReducer }) => ({
    sites: Object.values(sitesReducer.sites),
    isFetching: sitesReducer.isFetching,
    error: sitesReducer.error,
    filters: sitesReducer.filters
});

export default connect(mapStateToProps)(SitesListContainer);
