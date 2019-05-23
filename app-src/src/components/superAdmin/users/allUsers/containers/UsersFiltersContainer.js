import React from 'react';
import updateUsersFilters from 'actions/superAdmin/users/sync/updateUsersFilter';
import { connect } from 'react-redux';
import UsersFilters from '../presentational/UsersFilters';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';

const UsersFiltersContainer = ({ filters: { email, role }, dispatch }) => {
    const roleTypes = Object.entries(COMPANY_USER_ROLE_IDS).map(
        ([roleEnum, role]) => ({
            text: role,
            value: roleEnum
        })
    );

    return (
        <UsersFilters
            email={email}
            roleOptions={roleTypes}
            selectedRole={roleTypes[role]}
            handleChange={handleChange}
        />
    );

    function handleChange(name, value) {
        dispatch(updateUsersFilters(name, value));
    }
};

export default connect(({ superAdmin: { usersReducer: { filters } } }) => ({
    filters
}))(UsersFiltersContainer);
