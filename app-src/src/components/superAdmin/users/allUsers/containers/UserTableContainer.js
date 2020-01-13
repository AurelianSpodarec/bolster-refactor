import React from 'react';
import { connect } from 'react-redux';
import UserTable from '../presentational/UserTable';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';
import fetchUsersBySearch from 'actions/superAdmin/users/async/fetchUsersBySearch';
import updateUsersFilters from 'actions/superAdmin/users/sync/updateUsersFilter';

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
                headers={['Name', 'Email Address', 'Phone Number', 'Role', 'Created On', '']}
                isFetching={isFetching}
                error={error}
                users={_getFilteredUsers()}
            />
        </>
    );

    function _getFilteredUsers() {
        return users.filter(
            user =>
                (!role || (user.roles && user.roles.find(({ type }) => String(type) === role))) &&
                user.email &&
                user.email.toLowerCase().includes(email.toLowerCase())
        );
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
