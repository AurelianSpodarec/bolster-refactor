import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SitesTable from '../presentational/SitesTable';

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

        let sitesSearched = sites.filter(site =>
            site.name.toLowerCase().includes(name)
        );

        if (status === 'archived') {
            return sitesSearched.filter(site => site.isArchived);
        }

        return sitesSearched.filter(site => !site.isArchived);
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
    sites: Object.values(sites),
    isFetching,
    error,
    filters
});

export default withRouter(connect(mapStateToProps)(SitesTableContainer));
