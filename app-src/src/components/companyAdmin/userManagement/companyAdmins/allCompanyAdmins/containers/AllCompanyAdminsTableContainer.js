import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AllCompanyAdminsTable from '../presentational/AllCompanyAdminsTable';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { CREATE_COMPANY_ADMIN } from 'constants/shared/modalTypes';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty, nameSort } from 'helpers/generic';
import Search from 'components/shared/generic/form/presentational/Search';

const AllCompanyAdminTableContainer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { users, isFetching, error } = useSelector(mapStateToProps);
    const dispatch = useDispatch();

    return (
        <>
            <BlockContainer>
                <Search
                    value={searchTerm}
                    placeholder="Search by name/email"
                    handleChange={handleChange}
                    name="searchTerm"
                />
            </BlockContainer>
            <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(users)}>
                <AllCompanyAdminsTable
                    searchTerm={searchTerm}
                    handleChange={handleChange}
                    headers={[
                        'Name',
                        'Email',
                        'Phone Number',
                        'Has linked device?',
                        'Operative Code',
                        'Last upsynced date',
                        'Last detected unsynced data',
                        'App Version',
                        '',
                    ]}
                    users={_filterUsersForAdmins()}
                    isFetching={isFetching}
                    error={error}
                    handleCreateCompanyAdmin={handleCreateCompanyAdmin}
                />
            </BlockContainer>
        </>
    );

    function _filterUsersForAdmins() {
        const searchTermLower = searchTerm.toLowerCase();

        const ret = users.filter(user => {
            const name = `${user.userFirstName} ${user.userLastName}`.toLowerCase();
            return (
                user.type >= COMPANY_USER_ROLE_TYPES.ADMIN &&
                (!searchTermLower ||
                    name.includes(searchTermLower) ||
                    user.userEmail.includes(searchTermLower))
            );
        });

        return ret.sort(nameSort);
    }

    function handleCreateCompanyAdmin() {
        dispatch(showModal(CREATE_COMPANY_ADMIN));
    }

    function handleChange(_, value) {
        setSearchTerm(value);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    users: Object.values(users),
});

export default AllCompanyAdminTableContainer;
