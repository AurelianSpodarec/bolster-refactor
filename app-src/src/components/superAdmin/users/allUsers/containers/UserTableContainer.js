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
                    (user.roles &&
                        user.roles.find(
                            ({ type }) => String(type) === role
                        ))) &&
                user.email &&
                user.email.toLowerCase().includes(email)
        );
    }
};

const mapStateToProps = ({
    superAdmin: {
        usersReducer: { isFetching, error, users, filters }
    }
}) => ({
    isFetching,
    error,
    users: Object.values(users),
    filters
});

export default connect(mapStateToProps)(UserTableContainer);
