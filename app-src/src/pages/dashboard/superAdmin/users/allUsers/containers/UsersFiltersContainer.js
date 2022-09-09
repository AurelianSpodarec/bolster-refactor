import React from 'react';
import updateUsersFilters from 'actions/superAdmin/users/sync/updateUsersFilter';
import { connect } from 'react-redux';
import UsersFilters from '../presentational/UsersFilters';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';
import fetchUsersBySearch from 'actions/superAdmin/users/async/fetchUsersBySearch';
import { useDebounce } from '../../../../../../helpers/hooks';

const UsersFiltersContainer = ({
    filters: { searchTerm, role },
    updateUsersFilters,
    fetchUsersBySearch,
}) => {
    const roleTypes = Object.entries(COMPANY_USER_ROLE_IDS).map(([roleEnum, role]) => ({
        text: role,
        value: roleEnum,
    }));
    const selectedRole = roleTypes.find(({ value }) => value === role);
    useDebounce(handleChangeFiltersChanged, [searchTerm, role], 500);

    return (
        <UsersFilters
            searchTerm={searchTerm}
            roleOptions={roleTypes}
            selectedRole={selectedRole}
            handleChange={handleChange}
        />
    );

    function handleChangeFiltersChanged() {
        fetchUsersBySearch(1, searchTerm, role);
    }
    function handleChange(name, value) {
        updateUsersFilters(name, value);
        updateUsersFilters('page', 1);
    }
};
const mapStateToProps = ({
    superAdmin: {
        usersReducer: { filters, postSuccess },
    },
}) => ({ filters, postSuccess });

const mapDispatchToProps = { updateUsersFilters, fetchUsersBySearch };

export default connect(mapStateToProps, mapDispatchToProps)(UsersFiltersContainer);
