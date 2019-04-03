import React, { Component } from 'react';
import { connect } from 'react-redux';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import AllOperativesTable from '../presentational/AllOperativesTable';

class AllOperativesTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;

        return (
            <AllOperativesTable
                headers={['Name', 'Email', 'Phone Number', '']}
                users={this._filterUsersForOperatives()}
                isFetching={isFetching}
                error={error}
            />
        );
    }

    _filterUsersForOperatives = () => {
        const { users } = this.props;

        const ret = users.filter(
            user => user.type === COMPANY_USER_ROLE_TYPES.OPERATIVE
        );

        return ret;
    };
}

const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    users: Object.values(companyUsersReducer.users) || [],
    isFetching: companyUsersReducer.isFetching,
    error: companyUsersReducer.error,
    filters: {}
});

export default connect(mapStateToProps)(AllOperativesTableContainer);
