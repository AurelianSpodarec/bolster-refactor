import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AllCompanyAdminsTable from '../presentational/AllCompanyAdminsTable';
import { CREATE_COMPANY_ADMIN } from 'constants/shared/modalTypes';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

const AllCompanyAdminTableContainer = ({ filteredUsers }) => {
    const { users, isFetching, error } = useSelector(mapStateToProps);
    const dispatch = useDispatch();

    return (
        <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(users)}>
            <AllCompanyAdminsTable
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
                users={filteredUsers(users)}
                isFetching={isFetching}
                error={error}
                handleCreateCompanyAdmin={handleCreateCompanyAdmin}
            />
        </BlockContainer>
    );

    function handleCreateCompanyAdmin() {
        dispatch(showModal(CREATE_COMPANY_ADMIN));
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
