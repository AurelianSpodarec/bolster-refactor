import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SitesTable from '../presentational/SitesTable';

class SitesTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;
        return (
            <SitesTable
                headers={['Site name', 'Owned by', 'Permissions', 'Action']}
                sites={this._getFilteredSites()}
                isFetching={isFetching}
                error={error}
                handleAddSite={this.handleAddSite}
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

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites, isFetching, error, filters }
    }
}) => ({
    sites: Object.values(sites),
    isFetching,
    error,
    filters
});

export default withRouter(connect(mapStateToProps)(SitesTableContainer));
