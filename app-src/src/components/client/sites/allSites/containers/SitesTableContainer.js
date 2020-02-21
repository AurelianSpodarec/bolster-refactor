import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SitesTable from '../presentational/SitesTable';
import { hierarchySort } from 'helpers/generic';

class SitesTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;
        return (
            <SitesTable
                headers={['Site name', 'Owned by', 'Action']}
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

        const sitesSearched = sites.filter(site =>
            site.name.toLowerCase().includes(name)
        );

        const sitesSorted = this._getSortedSites(sitesSearched);

        if (status === 'active') {
            return sitesSorted.filter(site => !site.isArchived);
        }

        if (status === 'archived') {
            return sitesSorted.filter(site => site.isArchived);
        }

        return sitesSorted;
    };

    _getSortedSites = sites => {
        const { filters } = this.props;

        if (filters.sortBy === 'descending') {
            return sites.sort(
                (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
            );
        }

        if (filters.sortBy === 'ascending') {
            return sites.sort(
                (a, b) => new Date(a.createdOn) - new Date(b.createdOn)
            );
        }
        // default sort order as per api
        return sites.sort((a, b) => a.sort - b.sort);
    };
}

const mapStateToProps = ({
    client: {
        sitesReducer: { sites, isFetching, error }
    },
    shared: {
        sitesFilterReducer: { filters }
    }
}) => ({
    sites: Object.values(sites).sort(hierarchySort),
    isFetching,
    error,
    filters
});

export default withRouter(connect(mapStateToProps)(SitesTableContainer));
