import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllClientsTable from '../presentational/AllClientsTable';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

class AllClientTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;

        return (
            <AllClientsTable
                headers={['Name', '']}
                users={this._filterUsersForAdmins()}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    _filterUsersForAdmins = () => {
        const { users } = this.props;

        const ret = users.filter(
            user => user.type >= COMPANY_USER_ROLE_TYPES.ADMIN
        );

        return ret;
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users, isFetching, error, postSuccess }
    }
}) => ({
    isFetching,
    error,
    postSuccess,
    users: Object.values(users) || []
});

export default connect(mapStateToProps)(AllClientTableContainer);
