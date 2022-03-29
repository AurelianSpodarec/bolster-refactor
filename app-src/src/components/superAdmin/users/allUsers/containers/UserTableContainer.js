import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserTable from '../presentational/UserTable';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';
import fetchUsersBySearch from 'actions/superAdmin/users/async/fetchUsersBySearch';
import updateUsersFilters from 'actions/superAdmin/users/sync/updateUsersFilter';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { getSearchMatch } from 'helpers/general';
import { usePrevious } from '../../../../../helpers/hooks';

const UserTableContainer = ({
    isFetching,
    error,
    users,
    postSuccess,
    fetchUsersBySearch,
    updateUsersFilters,
    filters: { role, searchTerm, page },
    count,
}) => {
    const PAGE_SIZE = 50;
    const maxPage = Math.ceil(count / PAGE_SIZE);
    const prevProps = usePrevious({ postSuccess });
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            fetchUsersBySearch(page, searchTerm, role);
        }
    }, [postSuccess]);
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
                    'App version',
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
            .filter(u => getSearchMatch(searchTerm, `${u.firstName} ${u.lastName} ${u.email}`));
    }

    function setPage(nextPage) {
        fetchUsersBySearch(nextPage, searchTerm, role, PAGE_SIZE);
        updateUsersFilters('page', nextPage);
    }
};

const mapStateToProps = ({
    superAdmin: {
        usersReducer: { isFetching, error, users, filters, postSuccess, count },
    },
}) => ({
    isFetching,
    error,
    users: Object.values(users),
    filters,
    postSuccess,
    count,
});

const mapDispatchToProps = { fetchUsersBySearch, updateUsersFilters };

export default connect(mapStateToProps, mapDispatchToProps)(UserTableContainer);
