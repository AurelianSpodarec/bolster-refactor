import React from 'react';
import updateUsersFilters from 'actions/users/sync/updateUsersFilter';
import { connect } from 'react-redux';
import UsersFilters from '../presentational/UsersFilters';
import { ROLE_TYPES } from 'constants/companyAdmin/enums';

const UsersFiltersContainer = ({ filters: { email, role }, dispatch }) => {
    const roleTypes = Object.entries(ROLE_TYPES).map(([roleEnum, role]) => ({
        text: role,
        value: roleEnum
    }));

    return (
        <UsersFilters
            email={email}
            roleOptions={roleTypes}
            selectedRole={roleTypes[role]}
            handleChange={handleChange}
        />
    );

    function handleChange(e) {
        e.preventDefault();
        dispatch(updateUsersFilters(e.target.name, e.target.value));
    }
};

export default connect(({ usersReducer }) => ({
    filters: usersReducer.filters
}))(UsersFiltersContainer);
