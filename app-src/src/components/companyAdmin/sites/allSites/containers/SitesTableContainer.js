import React, { Component } from 'react';
import { connect } from 'react-redux';

import SitesTable from '../presentational/SitesTable';

class SitesListTableContainer extends Component {
    render() {
        const { isFetching, error, sites } = this.props;

        console.log(sites);

        return (
            <SitesTable
                headers={['Site name', 'Owned by', 'Permissions', 'Action']}
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
            .filter(site => site.name.toLowerCase().includes(name))
            .filter(
                ({ accessType }) =>
                    !status.length || status + '' === accessType + ''
            );
    };
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }) => ({
    sites: Object.values(sitesReducer.sites),
    isFetching: sitesReducer.isFetching,
    error: sitesReducer.error,
    filters: sitesReducer.filters
});

export default connect(mapStateToProps)(SitesListTableContainer);
