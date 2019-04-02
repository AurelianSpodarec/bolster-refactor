import React, { Component } from 'react';
import { connect } from 'react-redux';

import SitesTable from '../presentational/SitesTable';

class AllCompanyAdminTableContainer extends Component {
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

        return sites
            .filter(site => !status.length || site.status === status)
            .filter(site => site.name.toLowerCase().includes(name));
    };
}

const mapStateToProps = ({ companyUsersReducer }) => ({
    users: Object.values(companyUsersReducer.users),
    isFetching: companyUsersReducer.isFetching,
    error: companyUsersReducer.error
});

export default connect(mapStateToProps)(AllCompanyAdminTableContainer);
