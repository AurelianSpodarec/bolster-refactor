import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ACCESS_TYPES } from 'constants/companyAdmin/enums';

import SitesTable from '../presentational/SitesTable';

class SitesListTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;

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

        let sitesSearched = sites.filter(site =>
            site.name.toLowerCase().includes(name)
        );

        if (status === 'active') {
            return sitesSearched.filter(site => !site.isArchived);
        }

        if (status === 'read only') {
            return sitesSearched.filter(
                site => site.accessType === ACCESS_TYPES.READONLY
            );
        }

        if (status === 'archived') {
            return sitesSearched.filter(site => site.isArchived);
        }

        return sitesSearched;
    };
}

const mapStateToProps = ({ companyAdmin: { sitesReducer } }) => ({
    sites: Object.values(sitesReducer.sites),
    isFetching: sitesReducer.isFetching,
    error: sitesReducer.error,
    filters: sitesReducer.filters
});

export default connect(mapStateToProps)(SitesListTableContainer);
