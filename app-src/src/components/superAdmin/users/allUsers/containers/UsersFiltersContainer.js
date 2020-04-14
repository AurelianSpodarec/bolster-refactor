import React from 'react';
import updateUsersFilters from 'actions/superAdmin/users/sync/updateUsersFilter';
import { connect } from 'react-redux';
import UsersFilters from '../presentational/UsersFilters';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';
import fetchUsersBySearch from 'actions/superAdmin/users/async/fetchUsersBySearch';

const UsersFiltersContainer = ({
    filters: { email, role },
    updateUsersFilters,
    fetchUsersBySearch,
}) => {
    const roleTypes = Object.entries(COMPANY_USER_ROLE_IDS).map(([roleEnum, role]) => ({
        text: role,
        value: roleEnum,
    }));
    const selectedRole = roleTypes.find(({ value }) => value === role);
    return (
        <UsersFilters
            email={email}
            roleOptions={roleTypes}
            selectedRole={selectedRole}
            handleChange={handleChange}
        />
    );

    function handleChange(name, value) {
        const didEmailChange = name === 'email';
        const didRoleChange = name === 'role';
        const newEmail = didEmailChange ? value : email;
        const newRole = didRoleChange ? value : role;
        updateUsersFilters(name, value);
        updateUsersFilters('page', 1);
        fetchUsersBySearch(1, newEmail, newRole);
    }
};
const mapStateToProps = ({
    superAdmin: {
        usersReducer: { filters },
    },
}) => ({ filters });

const mapDispatchToProps = { updateUsersFilters, fetchUsersBySearch };

export default connect(mapStateToProps, mapDispatchToProps)(UsersFiltersContainer);
