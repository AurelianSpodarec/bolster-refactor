import React from 'react';
import { connect } from 'react-redux';
import UserTable from '../presentational/UserTable';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';
import fetchUsersBySearch from 'actions/superAdmin/users/async/fetchUsersBySearch';
import updateUsersFilters from 'actions/superAdmin/users/sync/updateUsersFilter';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

const UserTableContainer = ({
    isFetching,
    error,
    users,
    fetchUsersBySearch,
    updateUsersFilters,
    filters: { role, email, page },
    count,
}) => {
    const PAGE_SIZE = 50;
    const maxPage = Math.ceil(count / PAGE_SIZE);
    return (
        <>
            <BlockHeading title="Users">
                <PageSelector setPage={setPage} page={page} maxPage={maxPage} />
            </BlockHeading>
            <UserTable
                headers={[
                    'Name',
                    'Email Address',
                    'Phone Number',
                    'Role',
                    'Access granted by',
                    'Created On',
                    'Is e-mail confirmed?',
                    'Is deleted?',
                    '',
                ]}
                isFetching={isFetching}
                error={error}
                users={_getFilteredUsers()}
            />
        </>
    );

    function _getFilteredUsers() {
        const deletedRole = String(COMPANY_USER_ROLE_TYPES.DELETED);
        return users
            .filter(u => {
                if (!role) return true;
                if (role === deletedRole) return u.isDeleted;
                return u.roles && u.roles.find(({ type }) => String(type) === role);
            })
            .filter(u => u.email && u.email.toLowerCase().includes(email.toLowerCase()));
    }

    function setPage(nextPage) {
        fetchUsersBySearch(nextPage, email, role, PAGE_SIZE);
        updateUsersFilters('page', nextPage);
    }
};

const mapStateToProps = ({
    superAdmin: {
        usersReducer: { isFetching, error, users, filters, count },
    },
}) => ({
    isFetching,
    error,
    users: Object.values(users),
    filters,
    count,
});

const mapDispatchToProps = { fetchUsersBySearch, updateUsersFilters };

export default connect(mapStateToProps, mapDispatchToProps)(UserTableContainer);
