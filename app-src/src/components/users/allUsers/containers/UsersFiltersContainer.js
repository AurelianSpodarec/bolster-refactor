import React from 'react';
import updateUsersFilters from 'actions/users/sync/updateUsersFilter';
import { connect } from 'react-redux';
import UsersFilters from '../presentational/UsersFilters';
import { ROLE_TYPES } from 'constants/enums';

const UsersFiltersContainer = ({ filters: { email, role }, dispatch }) => {
    const handleChange = e => {
        e.preventDefault();
        dispatch(updateUsersFilters(e.target.name, e.target.value));
    };

    const roleTypes = Object.entries(ROLE_TYPES).map(([type, role]) => ({
        text: role,
        value: type
    }));

    return (
        <UsersFilters
            email={email}
            roleOptions={roleTypes}
            selectedRole={roleTypes[role]}
            handleChange={handleChange}
        />
    );
};

export default connect(({ usersReducer }) => ({
    filters: usersReducer.filters
}))(UsersFiltersContainer);
