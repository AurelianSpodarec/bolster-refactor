import React from 'react';
import { connect } from 'react-redux';
import UserTable from '../presentational/UserTable';

const UserTableContainer = ({ isFetching, error, users, filter }) => {
    const usersArr = Object.values(users);
    const filteredUsers = !filter
        ? usersArr
        : usersArr.filter(user =>
              user.email.toLowerCase().includes(filter.toLowerCase())
          );
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
            users={filteredUsers}
        />
    );
};

export default connect(({ usersReducer }) => ({
    isFetching: usersReducer.isFetching,
    error: usersReducer.error,
    users: usersReducer.users
}))(UserTableContainer);
