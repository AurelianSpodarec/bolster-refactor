import React, { Component } from 'react';
import { connect } from 'react-redux';

import SitesTable from '../presentational/SitesTable';

class SitesListTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;

        return (
            <SitesTable
                headers={['Site name', 'Owned by', 'Premissions', 'Action']}
                sites={this._getFilteredSites()}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    _getFilteredSites = () => {
        const { sites, filters } = this.props;
        const { status } = filters;
        const name = filters.name.toLowerCase();

        return sites
            .filter(site => !status.length || site.status === status)
            .filter(site => site.name.toLowerCase().includes(name));
    };
}

const mapStateToProps = ({ sitesReducer }) => ({
    sites: Object.values(sitesReducer.sites),
    isFetching: sitesReducer.isFetching,
    error: sitesReducer.error,
    filters: sitesReducer.filters
});

export default connect(mapStateToProps)(SitesListTableContainer);
