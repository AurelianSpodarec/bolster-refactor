import React from 'react';
import { connect } from 'react-redux';
import UserTable from '../presentational/UserTable';

const UserTableContainer = ({ isFetching, error, users }) => (
    <UserTable
        headers={['Name', 'Email Address', 'Phone Number', 'Created On', '']}
        isFetching={isFetching}
        error={error}
        users={Object.values(users)}
    />
);

export default connect(({ usersReducer }) => ({
    isFetching: usersReducer.isFetching,
    error: usersReducer.error,
    users: usersReducer.users
}))(UserTableContainer);
