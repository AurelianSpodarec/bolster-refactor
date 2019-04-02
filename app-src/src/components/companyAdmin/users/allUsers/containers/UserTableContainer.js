import React from 'react';
import { connect } from 'react-redux';
import UserTable from '../presentational/UserTable';

const UserTableContainer = ({ isFetching, error, users, filters }) => {
    return (
        <UserTable
            headers={[
                'Name',
                'Email Address',
                'Phone Number',
                'Role',
                'Created On',
                ''
            ]}
            isFetching={isFetching}
            error={error}
            users={_getFilteredUsers()}
        />
    );

    function _getFilteredUsers() {
        const { role } = filters;
        const email = filters.email.toLowerCase();
        return users.filter(
            user =>
                (!role ||
                    user.roles.find(({ type }) => String(type) === role)) &&
                user.email.toLowerCase().includes(email)
        );
    }
};

export default connect(({ superAdmin: { usersReducer } }) => ({
    isFetching: usersReducer.isFetching,
    error: usersReducer.error,
    users: Object.values(usersReducer.users),
    filters: usersReducer.filters
}))(UserTableContainer);
