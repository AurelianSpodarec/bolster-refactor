import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AllCompanyAdminsTable from '../presentational/AllCompanyAdminsTable';
import { CREATE_COMPANY_ADMIN } from 'constants/shared/modalTypes';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

const AllCompanyAdminTableContainer = ({ filteredUsers }) => {
    const { users, disabledUsers, isFetching, error } = useSelector(mapStateToProps);
    const dispatch = useDispatch();

    const mergedUsers = users.concat(disabledUsers);

    return (
        <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(mergedUsers)}>
            <AllCompanyAdminsTable
                headers={[
                    'Name',
                    'Phone number',
                    'Device name',
                    'Last upsynced date',
                    'App version',
                    'Drawing count',
                    '',
                ]}
                users={filteredUsers(mergedUsers)}
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
        companySettingsReducer: { isFetching: isFetchingCompanySettings },
        companyUsersReducer: { users, isFetching: isFetchingActive, error: activeError },
        inactiveCompanyUsersReducer: {
            disabled,
            isFetching: isFetchingInactive,
            error: inactiveError,
        },
    },
}) => ({
    isFetching: isFetchingActive || isFetchingInactive || isFetchingCompanySettings,
    error: activeError || inactiveError,
    users: Object.values(users),
    disabledUsers: Object.values(disabled),
});

export default AllCompanyAdminTableContainer;
