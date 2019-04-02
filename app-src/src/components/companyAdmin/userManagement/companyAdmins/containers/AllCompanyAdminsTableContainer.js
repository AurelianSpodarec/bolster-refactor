import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllCompanyAdminsTable from '../presentational/AllCompanyAdminsTable';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

class AllCompanyAdminTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;

        return (
            <AllCompanyAdminsTable
                headers={['Name', 'Email', 'Phone Number', '']}
                users={this._filterUsersForAdmins()}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    _filterUsersForAdmins = () => {
        const { users } = this.props;

        const ret = users.filter(
            user => user.type === COMPANY_USER_ROLE_TYPES['Admin']
        );

        return ret;
    };

    // _getFilteredAdmins = () => {
    //     const { sites, filters } = this.props;
    //     const { status } = filters;
    //     const name = filters.name.toLowerCase();

    //     return sites
    //         .filter(site => !status.length || site.status === status)
    //         .filter(site => site.name.toLowerCase().includes(name));
    // };
}

const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    users: Object.values(companyUsersReducer.users) || [],
    isFetching: companyUsersReducer.isFetching,
    error: companyUsersReducer.error
});

export default connect(mapStateToProps)(AllCompanyAdminTableContainer);
