import React from 'react';
import { connect } from 'react-redux';
import UserTable from '../presentational/UserTable';

const UserTableContainer = ({ isFetching, error, users }) => (
    <UserTable
        headers={'Users'}
        isFetching={isFetching}
        error={error}
        users={users}
    />
);

export default connect(({ usersReducer }) => ({
    isFetching: usersReducer.isFetching,
    error: usersReducer.error,
    users: usersReducer.users
}))(UserTableContainer);
