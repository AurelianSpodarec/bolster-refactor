import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserTable from '../presentational/UserTable';

class UserTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;
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
                users={this._getFilteredUsers()}
            />
        );
    }
    _getFilteredUsers = () => {
        const { users, filters } = this.props;
        const { role } = filters;
        const email = filters.email.toLowerCase();
        return users
            .filter(
                user =>
                    !role ||
                    user.roles.find(({ type }) => String(type) === role)
            )
            .filter(user => user.email.toLowerCase().includes(email));
    };
}

export default connect(({ usersReducer }) => ({
    isFetching: usersReducer.isFetching,
    error: usersReducer.error,
    users: Object.values(usersReducer.users),
    filters: usersReducer.filters
}))(UserTableContainer);
