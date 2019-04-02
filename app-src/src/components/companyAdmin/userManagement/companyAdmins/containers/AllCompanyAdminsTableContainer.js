import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllCompanyAdminsTable from '../presentational/AllCompanyAdminsTable';

class AllCompanyAdminTableContainer extends Component {
    render() {
        const { users, isFetching, error } = this.props;

        return (
            <AllCompanyAdminsTable
                headers={[
                    'Name',
                    'Email',
                    'Phone Number',
                    'Last Web Login',
                    ''
                ]}
                users={users}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    // _getFilteredSites = () => {
    //     const { sites, filters } = this.props;
    //     const { status } = filters;
    //     const name = filters.name.toLowerCase();

    //     return sites
    //         .filter(site => !status.length || site.status === status)
    //         .filter(site => site.name.toLowerCase().includes(name));
    // };
}

const mapStateToProps = ({ companyUsersReducer }) => ({
    users: Object.values(companyUsersReducer.users),
    isFetching: companyUsersReducer.isFetching,
    error: companyUsersReducer.error
});

export default connect(mapStateToProps)(AllCompanyAdminTableContainer);
